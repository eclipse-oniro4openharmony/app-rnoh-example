# React Native Project Setup

This documentation provides step-by-step instructions for creating and configuring a React Native project with OpenHarmony dependencies.

## 1. Creating the Project

Initialize a new React Native project in your selected directory (for instance, the root of drive D). Use the following command to create a project named AwesomeProject. Note that React Native for OpenHarmony supports version 0.72.5 only:

```sh
npx react-native@0.72.5 init AwesomeProject --version 0.72.5
```

If you are on macOS and want to avoid downloading the iOS dependency library during initialization, use the following command to skip this process:

```sh
npx react-native@0.72.5 init AwesomeProject --version 0.72.5 --skip-install
```

## 2. Installing OpenHarmony Dependency Packages

### 2.1. Update package.json

Open the `package.json` file in the AwesomeProject directory and add the OpenHarmony dependencies. Add a new script to generate a bundle and include the local dependency for OpenHarmony:

Replace the placeholder with the following snippet:

In the "dependencies" section, set the "react-native-harmony" field to the correct local path and version for your rnoh-react-native-harmony package. For example:

```json
"react-native-harmony": "file:../react-native-harmony/rnoh-react-native-harmony-0.72.58.tgz"
```

Adjust the path and version as needed.

```json
{
    "scripts": {
        "android": "react-native run-android",
        "ios": "react-native run-ios",
        "lint": "eslint .",
        "start": "react-native start",
        "test": "jest",
        "dev": "react-native bundle-harmony --dev"
    },
    "dependencies": {
        "react": "18.2.0",
        "react-native": "0.72.5",
        "react-native-harmony": "file:../react-native-harmony/rnoh-react-native-harmony-x.x.x.tgz"
    },
    "overrides": {
        "@react-native-community/cli": "11.3.6",
        "@react-native/codegen": "0.74.0"
    },
    "resolutions": {
        "@react-native-community/cli": "11.3.6"
    },
    "engines": {
        "node": ">=16"
    }
}
```

Run the command below in the AwesomeProject directory to install the dependency package (replace `x.x.x` with the desired version; if omitted, the latest version will be used):

```sh
npm i @react-native-oh/react-native-harmony@x.x.x
```

### 2.2. Generating the Bundle

Open the `metro.config.js` file in the AwesomeProject directory and insert the following OpenHarmony adaptation code. This modification ensures proper bundling and adapts the configuration for OpenHarmony:

```js
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

/**
 * @type {import("metro-config").ConfigT}
 */
const config = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = mergeConfig(
    getDefaultConfig(__dirname),
    createHarmonyMetroConfig({
        reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony'
    }),
    config
);
```

Run the following command in the AwesomeProject directory to **generate the bundle**. This command creates the `bundle.harmony.js` file and the `assets` folder, located in `AwesomeProject/harmony/entry/src/main/resources/rawfile`. The assets folder is used for storing images; if no local images are used, the folder may not appear.

```sh
npm run dev
```

## 3. Troubleshooting

If you encounter the error "'react-native' is not recognized as an internal or external command, operable program or batch file", re-run the following command to reinstall the node modules:

```sh
npm install
```
