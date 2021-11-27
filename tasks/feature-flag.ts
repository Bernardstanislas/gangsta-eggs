/* eslint-disable node/no-unpublished-import */
import { task } from "hardhat/config";
import { getContract } from "../utils/contract";
import promptjs from "prompt";

promptjs.message = "> ";
promptjs.delimiter = "";

task("toggle-feature", "Toggle feature for the contracts collection").setAction(
  async (_, { ethers }) => {
    console.log("🛠  Manage feature flags");
    const featureFlag = await getContract("FeatureFlag", ethers);
    const mintingPaused = await featureFlag.mintingPaused();
    const evolutionPaused = await featureFlag.evolutionPaused();
    const breedingPaused = await featureFlag.breedingPaused();

    console.log(`Minting:    ${mintingPaused ? "⏸  paused" : "✅ enabled"}`);
    console.log(`Evolution:  ${evolutionPaused ? "⏸  paused" : "✅ enabled"}`);
    console.log(`Breeding:   ${breedingPaused ? "⏸  paused" : "✅ enabled"}`);

    promptjs.start();
    const result = await promptjs.get([
      {
        properties: {
          feature: {
            type: "string",
            description: "Feature to toggle:",
          },
        },
      },
    ]);

    switch (result.feature) {
      case "minting":
        await featureFlag.setMintingPaused(!mintingPaused);
        break;
      case "evolution":
        await featureFlag.setEvolutionPaused(!evolutionPaused);
        break;
      case "breeding":
        await featureFlag.setBreedingPaused(!breedingPaused);
        break;
      default:
        console.log("🛑  Unknown feature ", result.feature);
    }

    console.log("✅ Completed");
  }
);
