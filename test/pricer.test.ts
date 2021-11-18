import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("Pricer", function () {
  let pricer: Contract;
  let generationTracker: Contract;

  const airdropLimit = 10;
  const startingPrice = ethers.utils.parseEther("0.01");
  const endingPrice = ethers.utils.parseEther("0.08");
  const totalCount = 50;

  beforeEach(async () => {
    const GenerationTracker = await ethers.getContractFactory(
      "GenerationTracker"
    );
    generationTracker = await upgrades.deployProxy(GenerationTracker, []);
    await generationTracker.deployed();
    const Pricer = await ethers.getContractFactory("Pricer");
    pricer = await upgrades.deployProxy(Pricer, [
      generationTracker.address,
      airdropLimit,
      startingPrice,
      endingPrice,
      totalCount,
      ethers.utils.parseEther("0.02"),
    ]);
    await pricer.deployed();
  });

  describe("mintingPrice()", () => {
    it("should first equal 0", async () => {
      expect(await pricer.mintingPrice()).to.eq(0);
    });

    it("should then be greater than 0 when the airdrop is done", async () => {
      await Promise.all(
        Array(10)
          .fill(0)
          .map((_, index) => generationTracker.registerNewlyMintedEgg(index))
      );
      expect(await pricer.mintingPrice()).to.eq(startingPrice);
    });

    it("should be linear", async () => {
      await Promise.all(
        Array(airdropLimit + Math.floor((1 / 4) * (totalCount - airdropLimit)))
          .fill(0)
          .map((_, index) => generationTracker.registerNewlyMintedEgg(index))
      );
      expect(await pricer.mintingPrice()).to.eq(
        startingPrice.add(endingPrice.sub(startingPrice).div(4))
      );
    });

    it("should end on target price", async () => {
      await Promise.all(
        Array(totalCount)
          .fill(0)
          .map((_, index) => generationTracker.registerNewlyMintedEgg(index))
      );
      expect(await pricer.mintingPrice()).to.eq(endingPrice);
    });

    it("should be precise enough", async () => {
      await pricer.setParameters(
        200,
        ethers.utils.parseEther("0.015"),
        ethers.utils.parseEther("0.06"),
        4444,
        ethers.utils.parseEther("0.02")
      );
      await Promise.all(
        Array(200)
          .fill(0)
          .map((_, index) => generationTracker.registerNewlyMintedEgg(index))
      );
      const price1 = await pricer.mintingPrice();

      await generationTracker.registerNewlyMintedEgg(200);

      const price2 = await pricer.mintingPrice();

      expect(price2.sub(price1)).to.equal(
        ethers.utils.parseEther("0.000010603204524033")
      );
    });
  });

  describe("airdropFinished()", () => {
    it("returns false during airdrop", async () => {
      expect(await pricer.airdropFinished()).to.equal(false);
    });

    it("returns true when airdrop is finished", async () => {
      await Promise.all(
        Array(airdropLimit)
          .fill(0)
          .map((_, index) => generationTracker.registerNewlyMintedEgg(index))
      );
      expect(await pricer.airdropFinished()).to.equal(true);
      await generationTracker.registerNewlyMintedEgg(airdropLimit + 1);
      expect(await pricer.airdropFinished()).to.equal(true);
    });
  });
});
