/* eslint-disable node/no-unpublished-import */
import { readFile } from "fs/promises";
import { task } from "hardhat/config";
import { handler } from "../autotasks/relay";

task("relay-meta-tx", "Relay a meta-transaction").setAction(
  async (_, { ethers }) => {
    const { RELAYER_API_KEY: apiKey, RELAYER_API_SECRET: apiSecret } =
      process.env;

    console.log("🛰 Relaying a meta transaction");
    const payload = await readFile("tmp/request.json", "utf8");
    await handler({
      apiKey,
      apiSecret,
      request: { body: JSON.parse(payload) },
    });
    console.log(`✅ Meta transaction relayed`);
  }
);
