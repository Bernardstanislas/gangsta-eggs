/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";
import { getContract } from "../utils/contract";
import deployments from "../contracts.json";
import { HardhatUpgrades } from "@openzeppelin/hardhat-upgrades";
import { HardhatEthersHelpers } from "hardhat/types";

const upgradeContract = async (
  contractName: string,
  upgrades: HardhatUpgrades,
  ethers: HardhatEthersHelpers
) => {
  const contract = await getContract(contractName, ethers);
  console.log(`Upgrading ${contractName}...`);
  await upgrades.upgradeProxy(
    contract,
    await ethers.getContractFactory(contractName)
  );
  console.log(`${contractName} upgraded successfully!`);
};

task("upgrade-proxy", "Upgrade the contracts").setAction(
  async ({ force }, { ethers, upgrades, run }) => {
    const network = await ethers.provider.getNetwork();
    await run("react");

    if (!(network.name in deployments)) {
      console.log("Proxies are not deployed to ", network.name);
      console.log("🛑 Aborting...");
      return;
    }

    console.log(`Upgrading proxies on ${network.name}...`);

    await upgradeContract("EggToken", upgrades, ethers);
    await upgradeContract("ChickToken", upgrades, ethers);
    await upgradeContract("BreedingTracker", upgrades, ethers);
    await upgradeContract("FeatureFlag", upgrades, ethers);
    await upgradeContract("GenerationTracker", upgrades, ethers);
    await upgradeContract("Pricer", upgrades, ethers);
    await upgradeContract("MintingQuota", upgrades, ethers);
    await upgradeContract("GangstaEggs", upgrades, ethers);

    console.log("All done ✅");
  }
);
