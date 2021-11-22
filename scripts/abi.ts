import { writeFile } from "fs/promises";
import { artifacts } from "hardhat";

async function main(): Promise<void> {
  const { abi } = await artifacts.readArtifact("MintingQuota");
  await writeFile("abi.json", JSON.stringify(abi, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
