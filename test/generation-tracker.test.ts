import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("GenerationTracker", function () {
  let generationTracker: Contract;
  let signers: SignerWithAddress[];
  let someLad: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    someLad = signers[1];
    const GenerationTracker = await ethers.getContractFactory(
      "GenerationTracker"
    );
    generationTracker = await upgrades.deployProxy(GenerationTracker, []);
    await generationTracker.deployed();
  });

  describe("registerNewlyMintedEgg()", () => {
    it("needs to be owner", async () => {
      await generationTracker.registerNewlyMintedEgg(123);

      await expect(
        generationTracker.connect(someLad).registerNewlyMintedEgg(123)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("stores the egg generation", async () => {
      await generationTracker.registerNewlyMintedEgg(123);

      expect(await generationTracker.eggGeneration(123)).to.equal(1);
    });

    it("fails if egg is already registered", async () => {
      await generationTracker.registerNewlyMintedEgg(123);
      await expect(
        generationTracker.registerNewlyMintedEgg(123)
      ).to.be.revertedWith("Egg already registered");
    });

    it("emits a MintedEggRegistered event", async () => {
      await expect(generationTracker.registerNewlyMintedEgg(123))
        .to.emit(generationTracker, "MintedEggRegistered")
        .withArgs(123);
    });
  });

  describe("registerNewlyLayedEgg()", () => {
    it("needs to be owner", async () => {
      await generationTracker.registerNewlyLayedEgg(123);

      await expect(
        generationTracker.connect(someLad).registerNewlyLayedEgg(123)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("stores the egg generation", async () => {
      await generationTracker.registerNewlyLayedEgg(123);

      expect(await generationTracker.eggGeneration(123)).to.equal(2);
    });

    it("emits a LayedEggRegistered event", async () => {
      await expect(generationTracker.registerNewlyLayedEgg(123))
        .to.emit(generationTracker, "LayedEggRegistered")
        .withArgs(123);
    });
  });

  describe("eggGeneration()", () => {
    it("reverts if asked egg is not registered", async () => {
      await expect(generationTracker.eggGeneration(123)).to.be.revertedWith(
        "Egg not registered"
      );
    });
  });

  describe("firstGenerationEggsCount()", () => {
    it("starts at 0", async () => {
      expect(await generationTracker.firstGenerationEggsCount()).to.equal(0);
    });

    it("gets incremented at each registration", async () => {
      await generationTracker.registerNewlyMintedEgg(123);
      expect(await generationTracker.firstGenerationEggsCount()).to.equal(1);

      await generationTracker.registerNewlyLayedEgg(124);
      expect(await generationTracker.firstGenerationEggsCount()).to.equal(1);

      await generationTracker.registerNewlyMintedEgg(125);
      expect(await generationTracker.firstGenerationEggsCount()).to.equal(2);
    });
  });
});
