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
  const totalCount = 30;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker"),
      []
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
      [pricer.address, generationTracker.address]
    );
  });

  describe("safeRegisterMinting()", () => {
    it("lets one minting during airdrop", async () => {
      await mintingQuota.safeRegisterMinting(signers[2].address);
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");
    });

    it("lets 20 mintings after airdrop", async () => {
      await mintingQuota.safeRegisterMinting(signers[2].address);
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");

      await Promise.all(
        Array(3)
          .fill(0)
          .map(async (_elem, index) => {
            await generationTracker.registerNewlyMintedEgg(index);
          })
      );

      await Promise.all(
        Array(19)
          .fill(0)
          .map(async () => {
            await mintingQuota.safeRegisterMinting(signers[2].address);
          })
      );
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Cannot mint anymore");
    });

    it("does not let minting when the limit is reached", async () => {
      await Promise.all(
        Array(30)
          .fill(0)
          .map(async (_elem, index) => {
            await generationTracker.registerNewlyMintedEgg(index + 1);
          })
      );
      await expect(
        mintingQuota.safeRegisterMinting(signers[2].address)
      ).to.be.revertedWith("Minting limit reached");
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
            await generationTracker.registerNewlyMintedEgg(index);
          })
      );

      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(19);

      await mintingQuota.safeRegisterMinting(ladAddress);
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(18);
    });

    it("takes into account the global minting limit", async () => {
      await Promise.all(
        Array(25)
          .fill(0)
          .map(async (_elem, index) => {
            await generationTracker.registerNewlyMintedEgg(index);
          })
      );
      expect(await mintingQuota.remainingMinting(ladAddress)).to.equal(5);
    });
  });
});
