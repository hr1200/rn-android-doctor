// @ts-check

import { reanimatedNeedsBabelPlugin } from "./rules.deps.js";
import { unsupportedClassFileMajor } from "./rules.logs.js";

/** @type {import("./ruleTypes.js").Rule[]} */
export const RULES = [
  reanimatedNeedsBabelPlugin,
  unsupportedClassFileMajor
];

