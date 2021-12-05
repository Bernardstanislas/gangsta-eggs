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
      [someFolk.address]
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
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someOtherFolk.address);
      await expect(
        breedingTracker.safeRegisterBreeding(0, 1)
      ).to.be.revertedWith("Chick1 and chick2 must be owned by the same owner");
    });

    it("checks that both chicks are different", async () => {
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);
      await expect(
        breedingTracker.safeRegisterBreeding(0, 0)
      ).to.be.revertedWith("Chick1 and chick2 cannot be the same");
    });

    it("lets a chick breed two times maximum", async () => {
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);

      await breedingTracker.safeRegisterBreeding(0, 1);
      await breedingTracker.safeRegisterBreeding(1, 2);
      await expect(
        breedingTracker.safeRegisterBreeding(1, 3)
      ).to.be.revertedWith("First chick cannot breed anymore");
    });

    it("does not let chicks breed twice together", async () => {
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);

      await breedingTracker.safeRegisterBreeding(0, 1);
      await expect(
        breedingTracker.safeRegisterBreeding(1, 0)
      ).to.be.revertedWith("Chick1 and chick2 have already breeded");
      await expect(
        breedingTracker.safeRegisterBreeding(0, 1)
      ).to.be.revertedWith("Chick1 and chick2 have already breeded");
    });

    it("keeps stats even when chicks are transfered", async () => {
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someOtherFolk.address);
      await chickToken.safeMint(someOtherFolk.address);

      await breedingTracker.safeRegisterBreeding(0, 1);
      await breedingTracker.safeRegisterBreeding(2, 3);
      await expect(
        breedingTracker.safeRegisterBreeding(1, 2)
      ).to.be.revertedWith("Chick1 and chick2 must be owned by the same owner");
      await chickToken
        .connect(someFolk)
        .transferFrom(someFolk.address, someOtherFolk.address, 1);
      await breedingTracker.safeRegisterBreeding(1, 2);
      await expect(
        breedingTracker.safeRegisterBreeding(1, 3)
      ).to.be.revertedWith("First chick cannot breed anymore");
    });

    it("emits two breeding events per breeding, in both ways", async () => {
      await chickToken.safeMint(someFolk.address);
      await chickToken.safeMint(someFolk.address);

      await expect(breedingTracker.safeRegisterBreeding(0, 1))
        .to.emit(breedingTracker, "Breeding")
        .withArgs(0, 1)
        .and.to.emit(breedingTracker, "Breeding")
        .withArgs(1, 0);
    });
  });
});
