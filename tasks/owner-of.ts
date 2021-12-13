/* eslint-disable node/no-unpublished-import */
import { task, types } from "hardhat/config";
import { getContract } from "../utils/contract";

task("owner-of", "Get the owner of an egg")
  .addParam("eggId", "The egg id", undefined, types.string, false)
  .setAction(async ({ eggId }, { ethers }) => {
    console.log("❔  Getting the owner of egg", eggId);
    const eggToken = await getContract("EggToken", ethers);
    const owner = await eggToken.ownerOf(eggId);

    console.log(`✅ Owner of egg #${eggId}: ${owner}`);
  });
