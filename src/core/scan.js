// @ts-check

import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import { loadContext } from "./context.js";
import { runRules } from "./engine.js";

/**
 * @param {{ path?: string; json?: string; fix?: boolean; dryRun?: boolean }} opts
 */
export async function runScan(opts) {
  const spinner = ora("Scanning project...").start();
  try {
    const ctx = await loadContext(opts.path || process.cwd(), null);
    const findings = await runRules(ctx);

    spinner.stop();

    if (findings.length === 0) {
      console.log(chalk.green("✅ No issues found (based on current rules)."));
    } else {
      console.log(chalk.yellow(`⚠ Found ${findings.length} issue(s):`));
      for (const f of findings) {
        console.log(`\n${chalk.red(f.severity.toUpperCase())}: ${chalk.bold(f.title)}`);
        console.log(`Confidence: ${f.confidence}`);
        for (const ev of f.evidence) console.log(`  - Evidence: ${ev.source}: ${ev.detail}`);
        console.log("Fixes:");
        for (const fix of f.fixes) console.log(`  - ${fix}`);
      }
    }

    if (opts.json) {
      await fs.writeJson(opts.json, { findings, meta: { path: opts.path || process.cwd() } }, { spaces: 2 });
      console.log(chalk.gray(`\nWrote report: ${opts.json}`));
    }
  } catch (e) {
    spinner.stop();
    const error = e instanceof Error ? e.message : String(e);
    console.error(chalk.red("Scan failed:"), error);
    process.exitCode = 1;
  }
}

