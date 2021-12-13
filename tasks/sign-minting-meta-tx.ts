/* eslint-disable node/no-unpublished-import */
import { writeFile } from "fs/promises";
import { task } from "hardhat/config";
import { getContract } from "../utils/contract";
import { signMetaTxRequest } from "../utils/signer";
import promptjs from "prompt";

promptjs.message = "> ";
promptjs.delimiter = "";

task("sign-minting-meta-tx", "Sign a minting meta-transaction").setAction(
  async (_, { ethers }) => {
    console.log("🛰 Signing a minting meta transaction");
    const forwarder = await getContract("MinimalForwarder", ethers);
    const gangstaEggs = await getContract("GangstaEggs", ethers);

    promptjs.start();
    const promptResult = await promptjs.get({
      properties: {
        signer: {
          type: "string",
          // @ts-ignore
          hidden: true,
          description: "Metatransaction signer (private key):",
          required: true,
          default: process.env.PRIVATE_KEY,
        },
      },
    });

    const { signer } = promptResult;
    const wallet = new ethers.Wallet(signer as string);
    const from = wallet.address;
    console.log(`Signing minting meta-transaction from ${from}`);
    const data = gangstaEggs.interface.encodeFunctionData("mintEgg");
    const result = await signMetaTxRequest(signer, forwarder, {
      to: gangstaEggs.address,
      from,
      data,
    });

    await writeFile("tmp/request.json", JSON.stringify(result, null, 2));
    console.log("Signature", result.signature);
    console.log("Request", result.request);

    console.log(`✅ Request signed`);
  }
);
