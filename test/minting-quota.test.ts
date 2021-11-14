import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MintingQuota", function () {
  let signers: SignerWithAddress[];
  let mintingQuota: Contract;
  let pricer: Contract;
  let generationTracker: Contract;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker"),
      [signers[1].address, signers[2].address]
    );
    pricer = await upgrades.deployProxy(
      await ethers.getContractFactory("Pricer"),
      [generationTracker.address]
    );
    mintingQuota = await upgrades.deployProxy(
      await ethers.getContractFactory("MintingQuota"),
      [pricer.address]
    );
    await generationTracker.deployed();
  });

  describe("safeRegisterMinting", () => {
    it("lets one minting during airdrop", async () => {
      await mintingQuota.safeRegisterMinting(signers[2].address);
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");
    });
  });
});
