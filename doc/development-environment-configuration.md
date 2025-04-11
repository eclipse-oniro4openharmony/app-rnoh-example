# Development environment configuration
## Environment Setup

1. **Install DevEco Studio**  
    Refer to [Downloading Software and Installing Software](#) for details.

2. **Set Up the Development Environment**  
    Ensure that network access is enabled to run the tool properly.

3. **Configure App Debugging**  
    - Run your app/service on a local real device.
    - Debug your app on the emulator.
    - Set up the hdc environment.

### Configuring hdc (OpenHarmony Device Connector)

The hdc tool is used for debugging on a real device in the OpenHarmony React Native project. Obtain the hdc tool from the OpenHarmony SDK and store it in the SDK’s toolchains directory. Then, add the full path of  
{DevEco Studio installation path}/sdk/{SDK version}/openharmony/toolchains  
to your OS environment variables.

#### On Windows

a. Navigate to: This PC > Properties > Advanced system settings > Advanced > Environment Variables.  
    - Add the hdc path to the system variable `PATH`.

b. Add a new system variable:  
    - **Name:** HDC_SERVER_PORT  
    - **Value:** A port number not in use (e.g., 7035).

#### On macOS

a. Open Terminal and run:
```
vi ~/.bash_profile
```
Add the following lines:
```
export PATH="/Applications/DevEco-Studio.app/Contents/sdk/{Version path}/openharmony/toolchains:$PATH"
HDC_SERVER_PORT=7035
launchctl setenv HDC_SERVER_PORT $HDC_SERVER_PORT
export HDC_SERVER_PORT
```
b. Save and exit by pressing Esc, typing `:wq`, and pressing Enter.

c. To apply the changes, run:
```
source ~/.bash_profile
```

### Setting Up the CAPI Version Environment Variable

The demo project uses the CAPI version. Set the environment variable `RNOH_C_API_ARCH` to `1`.

#### On Windows

1. Navigate to: This PC > Properties > Advanced system settings > Advanced > Environment Variables.
2. Add a new variable:
    - **Name:** RNOH_C_API_ARCH
    - **Value:** 1

#### On macOS

1. Open Terminal and run:
```
export RNOH_C_API_ARCH=1
```
2. Verify the setting with:
```
echo $RNOH_C_API_ARCH
```
If the output is `1`, the variable is set correctly.

3. For automatic setup on every Terminal launch, add the export command to your shell configuration file (e.g., `~/.bash_profile`, `~/.bashrc`, or `~/.zshrc`).

### Additional Notes

- **CMakeLists.txt Customization:**  
  If you need to customize the CMakeLists.txt file, name the shared library `rnoh_app`. For example:
  ```
  add_library(rnoh_app SHARED
        ...
        "${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
  )
  ```

After completing the above configurations, your React Native project on OpenHarmony is ready for further development. For additional guidance on setting up the React Native environment for Android and iOS, please refer to the official React Native documentation.
