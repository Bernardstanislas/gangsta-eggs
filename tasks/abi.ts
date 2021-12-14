/* eslint-disable node/no-unpublished-import */
import { writeFile } from "fs/promises";
import { task, types } from "hardhat/config";

task("generate-abi", "Airdrop an egg to an address")
  .addParam(
    "contract",
    "The contract to generate the ABI for",
    undefined,
    types.string,
    false
  )
  .setAction(async ({ contract }, { ethers, artifacts }) => {
    console.log("👀  Generating the ABI of", contract);
    const { abi } = await artifacts.readArtifact(contract);
    await writeFile(`tmp/${contract}.json`, JSON.stringify(abi, null, 2));
    console.log(`✅ Generated ABI for ${contract}`);
  });
