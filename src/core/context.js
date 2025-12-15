// @ts-check

import path from "node:path";
import fs from "fs-extra";

/**
 * @param {string} root
 * @param {string|null} logText
 * @returns {Promise<import("../rules/ruleTypes.js").Context>}
 */
export async function loadContext(root, logText = null) {
  const pkgPath = path.join(root, "package.json");
  const pkg = (await fs.pathExists(pkgPath)) ? await fs.readJson(pkgPath) : {};
  const rnVersion =
    pkg?.dependencies?.["react-native"] ||
    pkg?.devDependencies?.["react-native"] ||
    null;

  return {
    root,
    pkg,
    rnVersion,
    filesText: {},
    logText
  };
}

