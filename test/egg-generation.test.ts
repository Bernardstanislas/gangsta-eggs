import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("EggGeneration", function () {
  let eggGeneration: Contract;
  let signers: SignerWithAddress[];
  let minter: SignerWithAddress;
  let layer: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    minter = signers[1];
    layer = signers[2];
    const EggGeneration = await ethers.getContractFactory("EggGeneration");
    eggGeneration = await upgrades.deployProxy(EggGeneration, [
      minter.address,
      layer.address,
    ]);
    await eggGeneration.deployed();
  });

  describe("registerNewlyMintedEgg", () => {
    it("needs the MINTER role", async () => {
      await expect(
        eggGeneration.connect(layer).registerNewlyMintedEgg(123)
      ).to.be.revertedWith(
        "AccessControl: account 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc is missing role 0xf0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc9"
      );
    });
  });
});
