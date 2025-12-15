// @ts-check

/** @type {import("./ruleTypes.js").Rule} */
export const unsupportedClassFileMajor = {
  id: "logs.jdk.unsupportedClassFileMajor",
  title: "JDK mismatch (Unsupported class file major version)",
  run: (ctx) => {
    const log = ctx.logText || "";
    if (!log) return null;

    if (!/Unsupported class file major version/i.test(log)) return null;

    return {
      id: unsupportedClassFileMajor.id,
      title: unsupportedClassFileMajor.title,
      severity: "error",
      confidence: 1.0,
      fixes: [
        "Check your Gradle/JDK requirements for your React Native + Android Gradle Plugin version.",
        "Install the required JDK (often 17 for modern RN/AGP) and set JAVA_HOME to it.",
        "Then run: `cd android && ./gradlew clean` and rebuild."
      ],
      evidence: [{ source: "build.log", detail: "Matched: Unsupported class file major version" }]
    };
  }
};

