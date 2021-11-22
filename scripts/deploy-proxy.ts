import { ethers, upgrades } from "hardhat";
import deployments from "../contracts.json";

async function main(): Promise<void> {
  const network = await ethers.provider.getNetwork();

  if (network.name in deployments) {
    console.log("Already deployed to ", network.name);
    console.log("Aborting...");
    return;
  }

  // const airdropLimit = 200;
  // const startingPrice = ethers.utils.parseEther("0.015");
  // const endingPrice = ethers.utils.parseEther("0.05");
  // const breedingPrice = ethers.utils.parseEther("0.02");
  // const totalCount = 4444;
  // const proxyRegistry = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  // const eggTokenFactory = await ethers.getContractFactory("EggTokenFactory");
  // const eggToken = await upgrades.deployProxy(
  //   await ethers.getContractFactory("EggToken"),
  //   [proxyRegistry]
  // );
  // await eggToken.deployed();
  // console.log("EggToken deployed to: ", eggToken.address);
  // const chickToken = await upgrades.deployProxy(
  //   await ethers.getContractFactory("ChickToken"),
  //   [proxyRegistry]
  // );
  // await chickToken.deployed();
  // console.log("ChickToken deployed to: ", chickToken.address);
  // const breedingTracker = await upgrades.deployProxy(
  //   await ethers.getContractFactory("BreedingTracker"),
  //   [chickToken.address]
  // );
  // await breedingTracker.deployed();
  // console.log("BreedingTracker deployed to: ", breedingTracker.address);
  // const featureFlag = await upgrades.deployProxy(
  //   await ethers.getContractFactory("FeatureFlag")
  // );
  // await featureFlag.deployed();
  // console.log("FeatureFlag deployed to: ", featureFlag.address);
  // const generationTracker = await upgrades.deployProxy(
  //   await ethers.getContractFactory("GenerationTracker")
  // );
  // await generationTracker.deployed();
  // console.log("GenerationTracker deployed to: ", generationTracker.address);
  // const pricer = await upgrades.deployProxy(
  //   await ethers.getContractFactory("Pricer"),
  //   [
  //     generationTracker.address,
  //     airdropLimit,
  //     startingPrice,
  //     endingPrice,
  //     totalCount,
  //     breedingPrice,
  //   ]
  // );
  // await pricer.deployed();
  // console.log("Pricer deployed to: ", pricer.address);
  // const mintingQuota = await upgrades.deployProxy(
  //   await ethers.getContractFactory("MintingQuota"),
  //   [pricer.address, generationTracker.address]
  // );
  // await mintingQuota.deployed();
  // console.log("MintingQuota deployed to: ", mintingQuota.address);
  // const gangstaEggs = await upgrades.deployProxy(
  //   await ethers.getContractFactory("GangstaEggs"),
  //   [
  //     breedingTracker.address,
  //     eggToken.address,
  //     chickToken.address,
  //     featureFlag.address,
  //     generationTracker.address,
  //     mintingQuota.address,
  //     pricer.address,
  //   ]
  // );
  // await gangstaEggs.deployed();
  // console.log("GangstaEggs deployed to: ", gangstaEggs.address);
  // await mintingQuota.transferOwnership(gangstaEggs.address);
  // console.log("MintingQuota now owned by GangstaEggs");
  // await generationTracker.transferOwnership(gangstaEggs.address);
  // console.log("GenerationTracker now owned by GangstaEggs");
  // await eggToken.grantRole(
  //   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
  //   gangstaEggs.address
  // );
  // console.log("GangstaEggs now has the MINTER_ROLE in EggToken");
  // await chickToken.grantRole(
  //   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
  //   gangstaEggs.address
  // );
  // console.log("GangstaEggs now has the MINTER_ROLE in ChickToken");
  // await breedingTracker.grantRole(
  //   ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BREEDER_ROLE")),
  //   gangstaEggs.address
  // );
  // console.log("GangstaEggs now has the BREEDER_ROLE in BreedingTracker");

  console.log("All done ✅");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
