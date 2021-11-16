import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MintingQuota", function () {
  let signers: SignerWithAddress[];
  let mintingQuota: Contract;
  let pricer: Contract;
  let generationTracker: Contract;

  const airdropLimit = 3;
  const startingPrice = ethers.utils.parseEther("0.01");
  const endingPrice = ethers.utils.parseEther("0.08");
  const totalCount = 50;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker"),
      [signers[1].address, signers[2].address]
    );
    pricer = await upgrades.deployProxy(
      await ethers.getContractFactory("Pricer"),
      [
        generationTracker.address,
        airdropLimit,
        startingPrice,
        endingPrice,
        totalCount,
        ethers.utils.parseEther("0.02"),
      ]
    );
    mintingQuota = await upgrades.deployProxy(
      await ethers.getContractFactory("MintingQuota"),
      [pricer.address]
    );
    await generationTracker.deployed();
  });

  describe("safeRegisterMinting()", () => {
    it("lets one minting during airdrop", async () => {
      await mintingQuota.safeRegisterMinting(signers[2].address);
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");
    });

    it("lets 10 mintings after airdrop", async () => {
      await mintingQuota.safeRegisterMinting(signers[2].address);
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");

      await Promise.all(
        Array(3)
          .fill(0)
          .map(async (_elem, index) => {
            await generationTracker
              .connect(signers[1])
              .registerNewlyMintedEgg(index);
          })
      );

      await Promise.all(
        Array(9)
          .fill(0)
          .map(async (_elem, index) => {
            await mintingQuota.safeRegisterMinting(signers[2].address);
          })
      );
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");
    });
  });

  describe("remainingMinting()", () => {
    let ladAddress: string;

    beforeEach(async () => {
      ladAddress = signers[2].address;
    });

    it("is updated during airdrop", async () => {
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(1);
      await mintingQuota.safeRegisterMinting(ladAddress);
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(0);
    });

    it("is updated after airdrop", async () => {
      await mintingQuota.safeRegisterMinting(ladAddress);
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(0);

      await Promise.all(
        Array(3)
          .fill(0)
          .map(async (_elem, index) => {
            await generationTracker
              .connect(signers[1])
              .registerNewlyMintedEgg(index);
          })
      );

      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(9);

      await mintingQuota.safeRegisterMinting(ladAddress);
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(8);
    });
  });
});
