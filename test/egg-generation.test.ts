import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("GenerationTracker", function () {
  let generationTracker: Contract;
  let signers: SignerWithAddress[];
  let minter: SignerWithAddress;
  let layer: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    minter = signers[1];
    layer = signers[2];
    const GenerationTracker = await ethers.getContractFactory(
      "GenerationTracker"
    );
    generationTracker = await upgrades.deployProxy(GenerationTracker, [
      minter.address,
      layer.address,
    ]);
    await generationTracker.deployed();
  });

  describe("registerNewlyMintedEgg", () => {
    it("needs the MINTER role", async () => {
      await generationTracker.connect(minter).registerNewlyMintedEgg(123);

      await expect(
        generationTracker.connect(layer).registerNewlyMintedEgg(123)
      ).to.be.revertedWith(
        "AccessControl: account 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc is missing role 0xf0887ba65ee2024ea881d91b74c2450ef19e1557f03bed3ea9f16b037cbe2dc9"
      );
    });

    it("stores the egg generation", async () => {
      await generationTracker.connect(minter).registerNewlyMintedEgg(123);

      expect(await generationTracker.eggGeneration(123)).to.equal(1);
    });
  });

  describe("registerNewlyLayedEgg", () => {
    it("needs the LAYER role", async () => {
      await generationTracker.connect(layer).registerNewlyLayedEgg(123);

      await expect(
        generationTracker.connect(minter).registerNewlyLayedEgg(123)
      ).to.be.revertedWith(
        "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x6ad43ddcfb92662fdda85043ad5a98cecc92324910fd172368e1303a3bcd8d0c"
      );
    });

    it("stores the egg generation", async () => {
      await generationTracker.connect(layer).registerNewlyLayedEgg(123);

      expect(await generationTracker.eggGeneration(123)).to.equal(2);
    });
  });
});
