/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";
import deployments from "../contracts.json";

task(
  "deploy-forwarder",
  "Deploy the forwarder for the meta transactions"
).setAction(async (_, { ethers, run }) => {
  await run("compile");
  const network = await ethers.provider.ready;

  console.log(`Deploying forwarder to ${network.name}...`);

  // @ts-ignore
  if (network.name in deployments && "forwarder" in deployments[network.name]) {
    console.log("Already deployed to ", network.name);

    console.log("🛑 Aborting...");
    return;
  }

  const Forwarder = await ethers.getContractFactory("MinimalForwarder");
  const forwarder = await Forwarder.deploy();
  await forwarder.deployed();

  console.log("Forwarder deployed to: ", forwarder.address);
  console.log("All done ✅");
});
