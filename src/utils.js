import * as naj from "near-api-js";

export const provider = new naj.providers.JsonRpcProvider(
  "https://archival-rpc.testnet.near.org"
);