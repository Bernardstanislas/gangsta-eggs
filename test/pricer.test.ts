import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("Pricer", function () {
  let pricer: Contract;
  let generationTracker: Contract;
  let minter: SignerWithAddress;

  beforeEach(async () => {
    const GenerationTracker = await ethers.getContractFactory(
      "GenerationTracker"
    );
    const signers = await ethers.getSigners();
    minter = signers[1];
    const layer = signers[2];
    generationTracker = await upgrades.deployProxy(GenerationTracker, [
      minter.address,
      layer.address,
    ]);
    await generationTracker.deployed();
    const Pricer = await ethers.getContractFactory("Pricer");
    pricer = await upgrades.deployProxy(Pricer, [generationTracker.address]);
    await pricer.deployed();
  });

  describe("mintingPrice()", () => {
    const airdropLimit = 10;
    const startingPrice = ethers.utils.parseEther("0.01");
    const endingPrice = ethers.utils.parseEther("0.08");
    const totalCount = 50;

    const reduceLimits = async () => {
      await pricer.setAirdroppedEggsLimit(airdropLimit);
      await pricer.setEggsStartingPrice(startingPrice);
      await pricer.setEggsEndingPrice(endingPrice);
      await pricer.setFirstGenerationEggsCount(totalCount);
    };

    it("should first equal 0", async () => {
      expect(await pricer.mintingPrice()).to.eq(0);
    });

    it("should then be greater than 0 when the airdrop is done", async () => {
      await reduceLimits();
      await Promise.all(
        Array(10)
          .fill(0)
          .map((_, index) =>
            generationTracker.connect(minter).registerNewlyMintedEgg(index)
          )
      );
      expect(await pricer.mintingPrice()).to.eq(startingPrice);
    });

    it("should be linear", async () => {
      await reduceLimits();
      await Promise.all(
        Array(airdropLimit + Math.floor((1 / 4) * (totalCount - airdropLimit)))
          .fill(0)
          .map((_, index) =>
            generationTracker.connect(minter).registerNewlyMintedEgg(index)
          )
      );
      expect(await pricer.mintingPrice()).to.eq(
        startingPrice.add(endingPrice.sub(startingPrice).div(4))
      );
    });

    it("should end on target price", async () => {
      await reduceLimits();
      await Promise.all(
        Array(totalCount)
          .fill(0)
          .map((_, index) =>
            generationTracker.connect(minter).registerNewlyMintedEgg(index)
          )
      );
      expect(await pricer.mintingPrice()).to.eq(endingPrice);
    });

    it("should be precise enough", async () => {
      await Promise.all(
        Array(200)
          .fill(0)
          .map((_, index) =>
            generationTracker.connect(minter).registerNewlyMintedEgg(index)
          )
      );
      const price1 = await pricer.mintingPrice();

      await generationTracker.connect(minter).registerNewlyMintedEgg(200);

      const price2 = await pricer.mintingPrice();

      expect(price2.sub(price1)).to.equal(
        ethers.utils.parseEther("0.000010603204524033")
      );
    });
  });
});
