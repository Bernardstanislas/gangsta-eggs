import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("GangstaEggs", () => {
  let gangstaEggs: Contract;
  let eggToken: Contract;
  let chickToken: Contract;
  let featureFlag: Contract;
  let someFolk: SignerWithAddress;
  let anotherFolk: SignerWithAddress;
  const airdropLimit = 10;
  const startingPrice = ethers.utils.parseEther("0.01");
  const endingPrice = ethers.utils.parseEther("0.08");
  const breedingPrice = ethers.utils.parseEther("0.02");
  const totalCount = 50;

  before(async () => {
    someFolk = (await ethers.getSigners())[1];
    anotherFolk = (await ethers.getSigners())[2];
    eggToken = await upgrades.deployProxy(
      await ethers.getContractFactory("EggToken")
    );
    chickToken = await upgrades.deployProxy(
      await ethers.getContractFactory("ChickToken")
    );
    const breedingTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("BreedingTracker"),
      [chickToken.address]
    );
    featureFlag = await upgrades.deployProxy(
      await ethers.getContractFactory("FeatureFlag")
    );
    const generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker")
    );
    const pricer = await upgrades.deployProxy(
      await ethers.getContractFactory("Pricer"),
      [
        generationTracker.address,
        airdropLimit,
        startingPrice,
        endingPrice,
        totalCount,
        breedingPrice,
      ]
    );
    const mintingQuota = await upgrades.deployProxy(
      await ethers.getContractFactory("MintingQuota"),
      [pricer.address, generationTracker.address]
    );
    gangstaEggs = await upgrades.deployProxy(
      await ethers.getContractFactory("GangstaEggs"),
      [
        breedingTracker.address,
        eggToken.address,
        chickToken.address,
        featureFlag.address,
        generationTracker.address,
        mintingQuota.address,
        pricer.address,
      ]
    );
    await mintingQuota.transferOwnership(gangstaEggs.address);
    await generationTracker.transferOwnership(gangstaEggs.address);
    await eggToken.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
      gangstaEggs.address
    );
    await chickToken.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
      gangstaEggs.address
    );
  });

  describe("mint()", () => {
    it("does not initially let people mint", async () => {
      await expect(
        gangstaEggs.connect(someFolk).mintEgg("ipfs hash")
      ).to.be.revertedWith("Minting is paused");
    });

    it("lets people mint for free during airdrop", async () => {
      await featureFlag.setMintingPaused(false);

      await expect(gangstaEggs.connect(someFolk).mintEgg("ipfs hash"))
        .to.emit(eggToken, "Transfer")
        .withArgs(ethers.constants.AddressZero, someFolk.address, 0);
    });

    it("blocks the users who try to mint for free after airdrop", async () => {
      const signers = await ethers.getSigners();
      await Promise.all(
        Array(9)
          .fill(0)
          .map((_, index) =>
            gangstaEggs
              .connect(signers[(index + 2) % 10]) // every signers except signers[1]
              .mintEgg("ipfs hash")
          )
      );
      await expect(
        gangstaEggs.connect(someFolk).mintEgg("ipfs hash")
      ).to.revertedWith("Minting price not paid");
    });

    it("lets the user mint again when they pay for the minting price", async () => {
      await expect(
        gangstaEggs.connect(someFolk).mintEgg("ipfs hash", {
          value: ethers.utils.parseEther("0.01"),
        })
      ).not.to.be.reverted;
    });

    it("needs the user to pay for the price increase", async () => {
      await expect(
        gangstaEggs.connect(someFolk).mintEgg("ipfs hash", {
          value: ethers.utils.parseEther("0.01"),
        })
      ).to.revertedWith("Minting price not paid");
    });
  });

  describe("evolveEgg()", () => {
    it("checks that evolution is enabled", async () => {
      await expect(
        gangstaEggs.connect(someFolk).evolveEgg(10, "ipfs hash")
      ).to.revertedWith("Evolution is paused");
    });

    it("checks that the egg owner is the caller", async () => {
      await featureFlag.setEvolutionPaused(false);
      await expect(
        gangstaEggs.connect(anotherFolk).evolveEgg(10, "ipfs hash")
      ).to.revertedWith("Only egg owner can evolve egg");
    });

    it("mints a chick and destroys the evolved egg", async () => {
      await expect(gangstaEggs.connect(someFolk).evolveEgg(10, "ipfs hash"))
        .to.emit(chickToken, "Transfer")
        .withArgs(ethers.constants.AddressZero, someFolk.address, 0)
        .and.to.emit(eggToken, "Transfer")
        .withArgs(someFolk.address, ethers.constants.AddressZero, 10);
    });

    it("does not let evolving twice the same egg", async () => {
      await expect(
        gangstaEggs.connect(someFolk).evolveEgg(10, "ipfs hash")
      ).to.be.revertedWith("ERC721: owner query for nonexistent token");
    });
  });
});
