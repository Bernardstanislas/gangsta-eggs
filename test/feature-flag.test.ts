import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("FeatureFlag", function () {
  let featureFlag: Contract;

  beforeEach(async () => {
    featureFlag = await upgrades.deployProxy(
      await ethers.getContractFactory("FeatureFlag"),
      []
    );
    await featureFlag.deployed();
  });

  ["mintingPaused", "breedingPaused", "evolutionPaused"].forEach((method) => {
    describe(`${method}()`, () => {
      it("should be true by default", async () => {
        expect(await featureFlag[method]()).to.be.true;
      });
    });
  });

  describe("setMintingPaused()", () => {
    it("emits an unpaused event when unpaused", async () => {
      await expect(featureFlag.setMintingPaused(false)).to.emit(
        featureFlag,
        "MintingUnpaused"
      );
    });

    it("reverts when provided the wrong flag boolean", async () => {
      await expect(featureFlag.setMintingPaused(true)).to.be.reverted;
    });
  });
});
