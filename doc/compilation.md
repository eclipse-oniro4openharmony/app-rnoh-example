# Compilation

## Loading a Bundle

After a bundle is generated (as described in the previous section), load it into DevEco Studio to run the MyApplication project. You can load a bundle using any of the following methods:

### Method 1: Local Loading

Place the bundle file and asset images in the `entry/src/main/resources/rawfile` directory and reference them in `entry/src/main/ets/pages/Index.ets`.

### Method 2: Using Metro

Load the bundle using Metro. For details, see [Metro Hot Reloading](#).

### Method 3: Loading from the Sandbox Directory

The application sandbox is an isolation mechanism that prevents unauthorized data access via path traversal. Only the sandbox directory is visible to the application.

During development and debugging, you may need to push files to the sandbox for testing. Use one of the following methods:

1. **Via DevEco Studio:** Place the target file in the application installation path. For details, see "Resource Categories and Access."
2. **Using the hdc tool:** Push files to the app’s sandbox directory on the device with the following command:
    ```
    hdc file send ${LocalDirectory} ${SandboxDirectory}
    ```

To load a bundle from the sandbox directory, register it by using `new FileJSBundleProvider('bundlePath')` in the `jsBundleProvider` parameter of `RNApp`. In the `Index.ets` file under the `MyApplication/entry` directory, pass `jsBundleProvider` to load the bundle. The code provides three `BundleProviders` that attempt to load the bundle sequentially via Metro, sandbox, and local modes until successful.

## Starting and Running a Project

Use DevEco Studio to run the MyApplication project.

**It takes a long time to completely compile C++ code. Please wait.**

## Using the Release Package

1. **Create the Release Package:**
    - Create a `libs` folder in the `MyApplication` directory.
    - Copy the `react_native_openharmony-xxx-release.har` file into the `libs` folder.

2. **Update Dependencies:**
    - Open `oh-package.json5` under `MyApplication/entry`.
    - Replace the HAR dependency with the release package:
      ```json
      {
         "name": "entry",
         "version": "1.0.0",
         "description": "Please describe the basic information.",
         "main": "",
         "author": "",
         "license": "",
         "dependencies": {
            "@rnoh/react-native-openharmony": "file:../libs/react_native_openharmony-xxx-release.har"
         }
      }
      ```

3. **Modify CMake Configuration:**
    - Update the file `MyApplication/entry/src/main/cpp/CMakeLists.txt` as follows:
      ```cmake
      project(rnapp)
      cmake_minimum_required(VERSION 3.4.1)
      set(CMAKE_SKIP_BUILD_RPATH TRUE)
      set(NATIVERENDER_ROOT_PATH "${CMAKE_CURRENT_SOURCE_DIR}")
      set(OH_MODULE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
      set(RNOH_CPP_DIR "${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/include")
      set(REACT_COMMON_PATCH_DIR "${RNOH_CPP_DIR}/patches/react_native_core")

      set(CMAKE_CXX_STANDARD 17)
      set(LOG_VERBOSITY_LEVEL 1)
      set(CMAKE_ASM_FLAGS "-Wno-error=unused-command-line-argument -Qunused-arguments")
      set(RNOH_GENERATED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/generated")
      set(CMAKE_CXX_FLAGS "-fstack-protector-strong -Wl,-z,relro,-z,now,-z,noexecstack -s -fPIE -pie -DNDEBUG")
      set(WITH_HITRACE_SYSTRACE 1) # for other CMakeLists.txt files to use
      add_compile_definitions(WITH_HITRACE_SYSTRACE)

      # Folly compilation options
      set(folly_compile_options
            -DFOLLY_NO_CONFIG=1
            -DFOLLY_MOBILE=1
            -DFOLLY_USE_LIBCPP=1
            -DFOLLY_HAVE_RECVMMSG=1
            -DFOLLY_HAVE_PTHREAD=1
            -Wno-comma
            -Wno-shorten-64-to-32
            -Wno-documentation
            -faligned-new
      )
      add_compile_options("-Wno-unused-command-line-argument")

      # Add header directories.
      include_directories(${NATIVERENDER_ROOT_PATH}
                                 ${RNOH_CPP_DIR}
                                 ${REACT_COMMON_PATCH_DIR}
                                 ${RNOH_CPP_DIR}/third-party/folly
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/react/nativemodule/core
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/jsi
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/callinvoker
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/utility/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/stacktrace/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/predef/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/array/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/throw_exception/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/config/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/core/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/preprocessor/include
                                 ${RNOH_CPP_DIR}/third-party/double-conversion
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/react/renderer/graphics/platform/cxx
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/runtimeexecutor
                                 ${RNOH_CPP_DIR}/third-party/glog/src
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/mpl/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/type_traits/include
                                 ${RNOH_CPP_DIR}/third-party/rn/ReactCommon/yoga
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/intrusive/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/assert/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/move/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/static_assert/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/container_hash/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/describe/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/mp11/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/iterator/include
                                 ${RNOH_CPP_DIR}/third-party/boost/libs/detail/include
                                 ${RNOH_CPP_DIR}/patches/react_native_core/react/renderer/textlayoutmanager/platform/harmony
                                 )

      configure_file(
         ${RNOH_CPP_DIR}/third-party/folly/CMake/folly-config.h.cmake
         ${RNOH_CPP_DIR}/third-party/folly/folly/folly-config.h
      )
      file(GLOB GENERATED_CPP_FILES "./generated/*.cpp")

      # Add a shared dynamic library for RNOH.
      add_library(rnoh SHARED
            "${RNOH_CPP_DIR}/RNOHOther.cpp"
            "${RNOH_CPP_DIR}/third-party/folly/folly/lang/SafeAssert.cpp"
      )

      # Link additional .so files.
      target_link_directories(rnoh PUBLIC ${OH_MODULE_DIR}/@rnoh/react-native-openharmony/libs/arm64-v8a)
      target_link_libraries(rnoh PUBLIC
            rnoh_semi
            libace_napi.z.so
            libace_ndk.z.so
            librawfile.z.so
            libhilog_ndk.z.so
            libnative_vsync.so
            libnative_drawing.so
            libc++_shared.so
            libhitrace_ndk.z.so
            react_render_scheduler
            rrc_image
            rrc_text
            rrc_textinput
            rrc_scrollview
            react_nativemodule_core
            react_render_animations
            jsinspector
            hermes
            jsi
            logger
            react_config
            react_debug
            react_render_attributedstring
            react_render_componentregistry
            react_render_core
            react_render_debug
            react_render_graphics
            react_render_imagemanager
            react_render_mapbuffer
            react_render_mounting
            react_render_templateprocessor
            react_render_textlayoutmanager
            react_render_telemetry
            react_render_uimanager
            react_utils
            rrc_root
            rrc_view
            react_render_leakchecker
            react_render_runtimescheduler
            runtimeexecutor
      )

      if("$ENV{RNOH_C_API_ARCH}" STREQUAL "1")
            message("Experimental C-API architecture enabled")
            target_link_libraries(rnoh PUBLIC libqos.so)
            target_compile_definitions(rnoh PUBLIC C_API_ARCH)
      endif()

      # Add a shared rnoh_app library.
      add_library(rnoh_app SHARED
            ${GENERATED_CPP_FILES}
            "./PackageProvider.cpp"
            "${RNOH_CPP_DIR}/RNOHOther.cpp"
            "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
      )

      target_link_libraries(rnoh_app PUBLIC rnoh)
      target_compile_options(rnoh_app PUBLIC ${folly_compile_options} -DRAW_PROPS_ENABLED -std=c++17)
      ```

4. **Clean and Rebuild the Project:**
    - Delete the `oh_modules` folder from `MyApplication/entry`.
    - In DevEco Studio, click the `entry` folder and select Build > Clean Project to clear the project cache.
    - Choose File > Sync and Refresh Project to run `ohpm install`. The `oh_modules` folder will be regenerated.
    - Finally, select Run > Run 'entry' to start the project.
 