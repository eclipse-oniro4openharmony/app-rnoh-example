# OpenHarmony Application Code Documentation

This document describes how to create an OpenHarmony project, integrate React Native dependencies, and configure the project for both native and ArkTS environments. Follow the instructions step by step, and refer to alternative methods if you choose to replace files using MyApplicationReplace.zip.

---

## Creating or Integrating a Project

1. **Create a New Project:**
    - Navigate to **File > New > Create Project**.
    - Select an **Empty Ability** project.
    - When prompted, click **Next** and choose **API12** for the Compile SDK. 
    - Enter the project name (for example, `MyApplication`). Ensure the project path is not too long.

2. **Project Configuration:**
    - Connect your device.
    - Go to **File > Project Structure**.
    - In the dialog, click **Signing Configs**, select **Support OpenHarmony** and **Automatically generate signature**.
    - Log in with your HUAWEI ID to sign in.

---

## Adding the React Native Configuration

Run the following command in the project entry directory:

```
ohpm i @rnoh/react-native-openharmony@x.x.x
```

- A new `oh_modules` folder will be generated in both the project-level and module-level directories.
- Note: Replace `@x.x.x` with the desired version. If not specified, the latest version is installed.
- This process may take some time because the HAR package is large. Ensure that both `ohpm install` and IDE-generated `SyncData` are complete to avoid compilation errors.

---

## Integrating RNOH into a Native Project

### Adding CPP Code

1. **Setup:**
    - Create the `cpp` folder under `MyApplication/entry/src/main`.

2. **CMakeLists.txt:**
    Add a file named `CMakeLists.txt` in the `cpp` directory with the following content to compile the RNOH adaptation layer and generate `librnoh_app.so`:

    ```
    project(rnapp)
    cmake_minimum_required(VERSION 3.4.1)
    set(CMAKE_SKIP_BUILD_RPATH TRUE)
    set(OH_MODULE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
    set(RNOH_APP_DIR "${CMAKE_CURRENT_SOURCE_DIR}")

    set(RNOH_CPP_DIR "${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/cpp")
    set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated")
    set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments")
    set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -s -fPIE -pie")
    add_compile_definitions(WITH_HITRACE_SYSTRACE)
    set(WITH_HITRACE_SYSTRACE 1) # For other CMakeLists.txt files to use

    add_subdirectory("${RNOH_CPP_DIR}" ./rn)

    add_library(rnoh_app SHARED
         "./PackageProvider.cpp"
         "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
    )

    target_link_libraries(rnoh_app PUBLIC rnoh)
    ```

3. **PackageProvider.cpp:**
    Create the `PackageProvider.cpp` file in the `cpp` directory with the following content. It imports the RNOH PackageProvider and implements the `getPackages` method, returning an empty array since no additional packages are integrated:

    ```cpp
    #include "RNOH/PackageProvider.h"

    using namespace rnoh;

    std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
         return {};
    }
    ```

4. **Update Build Configuration:**
    Modify `MyApplication/entry/build-profile.json5` to include the native build task for the cpp directory. Add the following snippet within the `buildOption` section:

    ```json
    "externalNativeOptions": {
        "path": "./src/main/cpp/CMakeLists.txt",
        "arguments": "",
        "cppFlags": ""
    }
    ```

    Example of the modified section:

    ```json
    {
      "apiType": "stageMode",
      "buildOption": {
         "externalNativeOptions": {
            "path": "./src/main/cpp/CMakeLists.txt",
            "arguments": "",
            "cppFlags": ""
         }
      },
      "buildOptionSet": [
         {
            "name": "release",
            "arkOptions": {
              "obfuscation": {
                 "ruleOptions": {
                    "enable": true,
                    "files": [
                      "./obfuscation-rules.txt"
                    ]
                 }
              }
            }
         }
      ],
      "targets": [
         { "name": "default" },
         { "name": "ohosTest" }
      ]
    }
    ```

---

## Adding ArkTS Code

### Configuring the Entry Ability

1. **EntryAbility.ets:**
    Open `MyApplication/entry/src/main/ets/entryability/EntryAbility.ets` and import `RNAbility`:

    ```typescript
    import { RNAbility } from '@rnoh/react-native-openharmony';

    export default class EntryAbility extends RNAbility {
      getPagePath() {
         return 'pages/Index';
      }
    }
    ```

    - Use `super` if you need to maintain lifecycle callbacks within `EntryAbility`.

2. **RNPackagesFactory.ets:**
    Create the `RNPackagesFactory.ets` file in the `MyApplication/entry/src/main/ets` directory with the following content to export the `createRNPackages` function:

    ```typescript
    import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';

    export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
      return [];
    }
    ```

### Modifying the Main Page

1. **Index.ets:**
    Open `MyApplication/entry/src/main/ets/pages/Index.ets` and integrate the RNOH code. Ensure the `appKey` parameter of `RNApp` is identical to the app name registered by `AppRegistry.registerComponent` in the React Native project to avoid a white screen. Below is the modified code example:

    ```typescript
    import {
      AnyJSBundleProvider,
      ComponentBuilderContext,
      FileJSBundleProvider,
      MetroJSBundleProvider,
      ResourceJSBundleProvider,
      RNApp,
      RNOHErrorDialog,
      RNOHLogger,
      TraceJSBundleProviderDecorator,
      RNOHCoreContext
    } from '@rnoh/react-native-openharmony';
    import { createRNPackages } from '../RNPackagesFactory';

    @Builder
    export function buildCustomRNComponent(ctx: ComponentBuilderContext) {}

    const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomRNComponent)

    @Entry
    @Component
    struct Index {
      @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
      @State shouldShow: boolean = false
      private logger!: RNOHLogger

      aboutToAppear() {
         this.logger = this.rnohCoreContext!.logger.clone("Index")
         const stopTracing = this.logger.clone("aboutToAppear").startTracing();

         this.shouldShow = true
         stopTracing();
      }

      onBackPress(): boolean | undefined {
         // Ensure Ark ignores the back press handled by Ability.
         this.rnohCoreContext!.dispatchBackPress()
         return true
      }

      build() {
         Column() {
            if (this.rnohCoreContext && this.shouldShow) {
              if (this.rnohCoreContext?.isDebugModeEnabled) {
                 RNOHErrorDialog({ ctx: this.rnohCoreContext })
              }
              RNApp({
                 rnInstanceConfig: {
                    createRNPackages,
                    enableNDKTextMeasuring: true, // Must be true to enable NDK text measuring.
                    enableBackgroundExecutor: false,
                    enableCAPIArchitecture: true, // Must be true to enable CAPI
                    arkTsComponentNames: []
                 },
                 initialProps: { "foo": "bar" } as Record<string, string>,
                 appKey: "AwesomeProject",
                 wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
                 onSetUp: (rnInstance) => {
                    rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
                 },
                 jsBundleProvider: new TraceJSBundleProviderDecorator(
                    new AnyJSBundleProvider([
                      new MetroJSBundleProvider(),
                      // To load the bundle from file, place it at:
                      // `/data/app/el2/100/base/com.rnoh.tester/files/bundle.harmony.js` on your device.
                      new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
                      new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
                      new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'bundle.harmony.js')
                    ]),
                    this.rnohCoreContext.logger
                 ),
              })
            }
         }
         .height('100%')
         .width('100%')
      }
    }
    ```
