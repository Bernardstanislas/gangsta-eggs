/* eslint-disable node/no-unpublished-import */
import baseEthers from "ethers";

import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import { getContract } from "../../utils/contract";
import { ForwarderAbi } from "../../utils/forwarder-abi";

export async function relay(
  forwarder: any,
  request: any,
  signature: string,
  ethers: any,
  pricer?: any
) {
  if (!pricer) {
    pricer = await getContract("Pricer", ethers);
  }
  const accepts = !(await pricer.airdropFinished());
  if (!accepts) throw new Error(`Rejected request to ${request.to}`);

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`);

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString();
  return await forwarder.execute(request, signature, { gasLimit });
}

export async function handler(event: any, ethers = baseEthers) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`);
  const { request, signature } = event.request.body;
  console.log(`Relaying`, request);

  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ...event };
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  });
  const forwarderAddress = (await getContract("MinimalForwarder", ethers))
    .address;
  const forwarder = new ethers.Contract(forwarderAddress, ForwarderAbi, signer);

  // Relay transaction!
  const tx = await relay(forwarder, request, signature, ethers);
  console.log(`Sent meta-tx: ${tx.hash}`);
  return { txHash: tx.hash };
}
