import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { relay } from "../autotasks/relay";
import { signMetaTxRequest } from "../utils/signer";

use(chaiAsPromised);

describe("autotasks/relay", () => {
  let forwarder: Contract;
  let gangstaEggs: Contract;
  let pricer: Contract;
  let someFolk: SignerWithAddress;
  const airdropLimit = 10;
  const startingPrice = ethers.utils.parseEther("0.01");
  const endingPrice = ethers.utils.parseEther("0.08");
  const breedingPrice = ethers.utils.parseEther("0.02");
  const totalCount = 50;

  before(async () => {
    someFolk = (await ethers.getSigners())[2];
    const eggToken = await upgrades.deployProxy(
      await ethers.getContractFactory("EggToken"),
      [someFolk.address]
    );
    const chickToken = await upgrades.deployProxy(
      await ethers.getContractFactory("ChickToken"),
      [someFolk.address]
    );
    const breedingTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("BreedingTracker"),
      [chickToken.address]
    );
    const featureFlag = await upgrades.deployProxy(
      await ethers.getContractFactory("FeatureFlag")
    );
    const generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker")
    );
    pricer = await upgrades.deployProxy(
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
    const Forwarder = await ethers.getContractFactory("MinimalForwarder");
    forwarder = await Forwarder.deploy();
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
        forwarder.address,
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
    await breedingTracker.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BREEDER_ROLE")),
      gangstaEggs.address
    );
    await featureFlag.setMintingPaused(false);
  });

  it("refuses to send incorrect signature", async () => {
    const { request, signature } = await signMetaTxRequest(
      someFolk.provider,
      forwarder,
      {
        from: someFolk.address,
        to: gangstaEggs.address,
        data: gangstaEggs.interface.encodeFunctionData("mintEgg", []),
        nonce: 5,
      }
    );

    expect(
      relay(forwarder, request, signature, ethers, pricer)
    ).to.be.rejectedWith("Invalid request");
  });
});
