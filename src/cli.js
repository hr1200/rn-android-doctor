#!/usr/bin/env node
// @ts-check

import { Command } from "commander";
import { runScan } from "./core/scan.js";
import { runLogAnalysis } from "./core/logs.js";

const program = new Command();

program
  .name("rn-doctor")
  .description("React Native Android diagnostic CLI (rule-based, AI optional)")
  .version("0.1.0");

program
  .command("scan")
  .description("Scan the current project for Android/RN issues")
  .option("--path <path>", "Project root path", process.cwd())
  .option("--json <file>", "Write report JSON to file")
  .option("--fix", "Apply safe fixes (limited)", false)
  .option("--dry-run", "Show what would change without writing", false)
  .action(runScan);

program
  .command("logs <file>")
  .description("Analyze an Android build log file and suggest fixes")
  .option("--path <path>", "Project root path", process.cwd())
  .option("--json <file>", "Write report JSON to file")
  .action(runLogAnalysis);

program.parse(process.argv);

