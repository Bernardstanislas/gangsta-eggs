/* eslint-disable node/no-unpublished-import */
import { task, types } from "hardhat/config";
import deployments from "../contracts.json";
import promptjs from "prompt";

promptjs.message = "> ";
promptjs.delimiter = "";

task("deploy-proxy", "Deploy the initial proxy to the upgradeable contracts")
  .addOptionalParam(
    "force",
    "Force the deployment even if the proxy is alread deployed",
    false,
    types.boolean
  )
  .setAction(async ({ force }, { ethers, upgrades, run }) => {
    const network = await ethers.provider.ready;

    await run("react");
    console.log(`Deploying proxy to ${network.name}...`);

    if (network.name in deployments) {
      console.log("Already deployed to ", network.name);
      if (!force) {
        console.log("🛑 Aborting...");
        return;
      }
      console.log("--force flag passed, continuing...");
    }

    promptjs.start();
    const result = await promptjs.get({
      properties: {
        airdropLimit: {
          type: "number",
          description: "Airdrop limit:",
          default: 200,
          required: true,
        },
        startingPrice: {
          type: "number",
          description: "Starting price (MATIC):",
          default: 40,
          required: true,
        },
        endingPrice: {
          type: "number",
          description: "Ending price (MATIC):",
          default: 130,
          required: true,
        },
        breedingPrice: {
          type: "number",
          description: "Breeding price (MATIC):",
          default: 50,
          required: true,
        },
        totalCount: {
          type: "number",
          description: "Total egg count:",
          default: 4444,
          required: true,
        },
        proxyRegistry: {
          type: "string",
          description: "Opensea proxy registry address:",
          default: "0xf57b2c51ded3a29e6891aba85459d600256cf317",
          required: true,
        },
      },
    });
    const {
      proxyRegistry,
      airdropLimit,
      startingPrice,
      endingPrice,
      breedingPrice,
      totalCount,
    } = result;
    const eggToken = await upgrades.deployProxy(
      await ethers.getContractFactory("EggToken"),
      [proxyRegistry]
    );
    await eggToken.deployed();
    console.log("EggToken deployed to: ", eggToken.address);
    const chickToken = await upgrades.deployProxy(
      await ethers.getContractFactory("ChickToken"),
      [proxyRegistry]
    );
    await chickToken.deployed();
    console.log("ChickToken deployed to: ", chickToken.address);
    const breedingTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("BreedingTracker"),
      [chickToken.address]
    );
    await breedingTracker.deployed();
    console.log("BreedingTracker deployed to: ", breedingTracker.address);
    const featureFlag = await upgrades.deployProxy(
      await ethers.getContractFactory("FeatureFlag")
    );
    await featureFlag.deployed();
    console.log("FeatureFlag deployed to: ", featureFlag.address);
    const generationTracker = await upgrades.deployProxy(
      await ethers.getContractFactory("GenerationTracker")
    );
    await generationTracker.deployed();
    console.log("GenerationTracker deployed to: ", generationTracker.address);
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
    await pricer.deployed();
    console.log("Pricer deployed to: ", pricer.address);
    const mintingQuota = await upgrades.deployProxy(
      await ethers.getContractFactory("MintingQuota"),
      [pricer.address, generationTracker.address]
    );
    await mintingQuota.deployed();
    console.log("MintingQuota deployed to: ", mintingQuota.address);
    const gangstaEggs = await upgrades.deployProxy(
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
    await gangstaEggs.deployed();
    console.log("GangstaEggs deployed to: ", gangstaEggs.address);
    await mintingQuota.transferOwnership(gangstaEggs.address);
    console.log("MintingQuota now owned by GangstaEggs");
    await generationTracker.transferOwnership(gangstaEggs.address);
    console.log("GenerationTracker now owned by GangstaEggs");
    await eggToken.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
      gangstaEggs.address
    );
    console.log("GangstaEggs now has the MINTER_ROLE in EggToken");
    await chickToken.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
      gangstaEggs.address
    );
    console.log("GangstaEggs now has the MINTER_ROLE in ChickToken");
    await breedingTracker.grantRole(
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BREEDER_ROLE")),
      gangstaEggs.address
    );
    console.log("GangstaEggs now has the BREEDER_ROLE in BreedingTracker");

    console.log("All done ✅");
  });
