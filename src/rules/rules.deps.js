// @ts-check

import { readTextCached } from "../utils/readFile.js";

/** @type {import("./ruleTypes.js").Rule} */
export const reanimatedNeedsBabelPlugin = {
  id: "deps.reanimated.babelPlugin",
  title: "Reanimated installed but Babel plugin is missing",
  run: async (ctx) => {
    const deps = {
      ...(ctx.pkg?.dependencies || {}),
      ...(ctx.pkg?.devDependencies || {})
    };
    const hasReanimated = !!deps["react-native-reanimated"];
    if (!hasReanimated) return null;

    const babelText = await readTextCached(ctx, "babel.config.js");
    const hasPlugin = babelText?.includes("react-native-reanimated/plugin");

    if (hasPlugin) return null;

    return {
      id: reanimatedNeedsBabelPlugin.id,
      title: reanimatedNeedsBabelPlugin.title,
      severity: "error",
      confidence: 0.9,
      fixes: [
        "Add `react-native-reanimated/plugin` to babel.config.js plugins (must be last).",
        "Then reset Metro cache and rebuild."
      ],
      evidence: [
        { source: "package.json", detail: "Found dependency react-native-reanimated" },
        { source: "babel.config.js", detail: "Missing react-native-reanimated/plugin" }
      ]
    };
  }
};

