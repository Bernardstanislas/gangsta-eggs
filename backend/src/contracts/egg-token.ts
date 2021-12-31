import { ethers } from "ethers";
// @ts-ignore
// eslint-disable-next-line node/no-unpublished-import
import eggTokenMetadata from "../../../artifacts/contracts/tokens/EggToken.sol/EggToken.json";
// @ts-ignore
// eslint-disable-next-line node/no-unpublished-import
import deployments from "../../../contracts.json";

const eggTokenAddress = deployments.matic.EggToken;

const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETHERS_PROVIDER_URL
);

export const eggToken = new ethers.Contract(
  eggTokenAddress,
  eggTokenMetadata.abi,
  provider
);
