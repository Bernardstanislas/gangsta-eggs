import {
  DefenderRelaySigner,
  DefenderRelayProvider,
} from "defender-relay-client/lib/ethers";
import deployments from "../../contracts.json";
// eslint-disable-next-line camelcase
import { Pricer__factory } from "../../frontend/src/hardhat/typechain/factories/Pricer__factory";
// eslint-disable-next-line camelcase
import { MinimalForwarder__factory } from "../../frontend/src/hardhat/typechain/factories/MinimalForwarder__factory";

export async function relay(
  forwarder: any,
  request: any,
  signature: string,
  pricer: any
) {
  const accepts =
    !(await pricer.airdropFinished()) && request.data === "0x307c02a9"; // 0x307c02a9 is the signature of "mintEgg" with no argument
  if (!accepts) throw new Error(`Rejected request to ${request.to}`);

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`);

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString();
  return await forwarder.execute(request, signature, { gasLimit });
}

export async function handler(event: any) {
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
  const forwarderAddress = deployments.maticmum.MinimalForwarder;
  const forwarder = await MinimalForwarder__factory.connect(
    forwarderAddress,
    signer as any
  );

  const pricerAddress = deployments.maticmum.Pricer;
  const pricer = await Pricer__factory.connect(pricerAddress, signer as any);

  // Relay transaction!
  const tx = await relay(forwarder, request, signature, pricer);
  console.log(`Sent meta-tx: ${tx.hash}`);
  return { txHash: tx.hash };
}
