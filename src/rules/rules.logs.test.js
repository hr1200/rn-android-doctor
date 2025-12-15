import { describe, it, expect } from "vitest";
import { unsupportedClassFileMajor } from "./rules.logs.js";

describe("unsupportedClassFileMajor", () => {
  it("detects unsupported class file major version", () => {
    const ctx = { 
      root: "/test",
      pkg: {},
      rnVersion: null,
      filesText: {},
      logText: "Unsupported class file major version 65" 
    };
    const result = unsupportedClassFileMajor.run(ctx);
    // This rule returns synchronously, not a Promise
    const finding = result instanceof Promise ? null : result;
    expect(finding).not.toBeNull();
    if (finding) {
      expect(finding.confidence).toBe(1.0);
    }
  });

  it("returns null when log text is missing", () => {
    const ctx = { 
      root: "/test",
      pkg: {},
      rnVersion: null,
      filesText: {},
      logText: null 
    };
    const result = unsupportedClassFileMajor.run(ctx);
    const finding = result instanceof Promise ? null : result;
    expect(finding).toBeNull();
  });

  it("returns null when pattern is not found", () => {
    const ctx = { 
      root: "/test",
      pkg: {},
      rnVersion: null,
      filesText: {},
      logText: "Some other error message" 
    };
    const result = unsupportedClassFileMajor.run(ctx);
    const finding = result instanceof Promise ? null : result;
    expect(finding).toBeNull();
  });
});

