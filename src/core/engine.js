// @ts-check

import { RULES } from "../rules/ruleRegistry.js";

/** 
 * @param {import("../rules/ruleTypes.js").Context} ctx 
 * @returns {Promise<import("../rules/ruleTypes.js").Finding[]>}
 */
export async function runRules(ctx) {
  const findings = [];
  for (const rule of RULES) {
    const result = await rule.run(ctx);
    if (result) findings.push(result);
  }
  return findings;
}

