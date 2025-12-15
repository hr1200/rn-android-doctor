### Using this tool from GitHub source

If you cloned this repository directly from GitHub, first install the dependencies by running `npm install` or `yarn install` from the project root. Once dependencies are installed, build the CLI by running `npm run build`, which will generate the executable file at `dist/cli.js`.

After building, you can use the tool from any React Native project by running it with Node. To scan a project for common Android configuration and dependency issues, run `node /path/to/rn-android-doctor/dist/cli.js scan` from the root of your React Native app. To analyze Android build logs, generate a log using Gradle (for example `./gradlew assembleDebug --stacktrace --info | tee build.log`) and then run `node /path/to/rn-android-doctor/dist/cli.js logs android/build.log`.

For easier usage, you can link the CLI globally by running `npm link` from the cloned repository. After linking, the `rn-doctor` command will be available globally and you can simply run `rn-doctor scan` or `rn-doctor logs android/build.log` from any React Native project. If you want to export the results for CI or sharing with teammates, you can generate a JSON report using `rn-doctor scan --json rn-doctor-report.json`.

This tool is read-only by default and does not modify project files automatically; all fixes are suggested based on detected evidence.
