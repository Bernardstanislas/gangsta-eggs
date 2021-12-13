/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";
import { getContract } from "../utils/contract";

task(
  "set-trusted-forwarder",
  "Sets the trusted forwarder in the GangstaEggs contract"
).setAction(async (_, { ethers, run }) => {
  await run("compile");

  const forwarder = await getContract("MinimalForwarder", ethers);
  const gangstaEggs = await getContract("GangstaEggs", ethers);
  console.log(`Setting trusted forwarder to ${forwarder.address}`);

  await gangstaEggs.setTrustedForwarder(forwarder.address);

  console.log("All done ✅");
});
