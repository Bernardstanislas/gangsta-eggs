import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("BreedingTracker", function () {
  let breedingTracker: Contract;
  let someFolk: SignerWithAddress;
  let someOtherFolk: SignerWithAddress;
  let chickToken: Contract;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    someFolk = signers[3];
    someOtherFolk = signers[4];

    chickToken = await upgrades.deployProxy(
      await ethers.getContractFactory("ChickToken"),
      []
    );
    await chickToken.deployed();
    breedingTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("BreedingTracker"),
      [chickToken.address]
    );
    await breedingTracker.deployed();
  });

  describe("safeRegisterBreeding()", () => {
    it("checks that both chicks are owned by the same owner", async () => {
      await chickToken.safeMint(someFolk.address, "croute");
      await chickToken.safeMint(someOtherFolk.address, "yolo");
      await expect(
        breedingTracker.safeRegisterBreeding(0, 1)
      ).to.be.revertedWith("Chick1 and chick2 must be owned by the same owner");
    });
  });
});
