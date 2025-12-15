// @ts-check

import fs from "fs-extra";
import path from "node:path";

/** 
 * @param {import("../rules/ruleTypes.js").Context} ctx 
 * @param {string} relPath
 * @returns {Promise<string | null>}
 */
export async function readTextCached(ctx, relPath) {
  if (ctx.filesText[relPath] !== undefined) return ctx.filesText[relPath];
  
  const fullPath = path.join(ctx.root, relPath);
  const exists = await fs.pathExists(fullPath);
  
  if (!exists) {
    ctx.filesText[relPath] = null;
    return null;
  }
  
  const text = await fs.readFile(fullPath, "utf8");
  ctx.filesText[relPath] = text;
  return text;
}

