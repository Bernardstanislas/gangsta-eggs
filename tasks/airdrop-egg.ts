/* eslint-disable node/no-unpublished-import */
import { task, types } from "hardhat/config";
import { getContract } from "../utils/contract";

task("airdrop-egg", "Airdrop an egg to an address")
  .addParam("target", "The target address", undefined, types.string, false)
  .setAction(async ({ target }, { ethers }) => {
    console.log("🛰 Airdropping an egg to", target);
    const gangstaEggs = await getContract("GangstaEggs", ethers);
    const receipt = await (await gangstaEggs.airdropEgg(target)).wait();

    if (!receipt.events?.length) {
      throw new Error("❌ Failed to airdrop egg");
    }

    const egg = parseInt(receipt.events[1].data);
    console.log(`✅ Airdropped egg #${egg} to ${target}`);
  });
