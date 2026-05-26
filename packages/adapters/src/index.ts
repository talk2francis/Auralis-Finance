import { getAssetState as aave } from "./assets/aave";
import { getAssetState as cmeth } from "./assets/cmeth";
import { getAssetState as merchantMoe } from "./assets/merchantMoe";
import { getAssetState as meth } from "./assets/meth";
import { getAssetState as mi4 } from "./assets/mi4";
import { getAssetState as qcdt } from "./assets/qcdt";
import { getAssetState as usde } from "./assets/usde";
import { getAssetState as usdy } from "./assets/usdy";

export * from "./types";
export * from "./rpc";
export * from "./price";
export * from "./sanctions";
export * from "./oracle";

export async function getAllAssets() {
  return Promise.all([usdy(), qcdt(), meth(), cmeth(), usde(), mi4(), aave(), merchantMoe()]);
}
