# Prerequisites

## Table of Contents
- [npm Installation](#npm-installation)
  - [Step 1: Install Node.js (including npm)](#step-1-install-nodejs-including-npm)
  - [Step 2: Verify the npm Installation](#step-2-verify-the-npm-installation)
  - [Step 3: Update npm (Optional)](#step-3-update-npm-optional)
- [Software and Hardware Requirements](#software-and-hardware-requirements)
- [Building the React Native Framework from Source](#building-the-react-native-framework-from-source)
  - [Cloning the Repository](#cloning-the-repository)
  - [Compilation of the Framework and Sample Tester Application](#compilation-of-the-framework-and-sample-tester-application)

---

## npm Installation

npm (Node Package Manager) is a tool for managing Node.js packages, essential for both front-end and back-end projects. In most cases, npm is installed alongside Node.js.

### Step 1: Install Node.js (including npm)

1. Visit the [official Node.js website](https://nodejs.org) and download the installer.
2. Choose the LTS (Long Term Support) version for stability.
3. Run the installer and follow the instructions.

### Step 2: Verify the npm Installation

1. Open a terminal or command prompt.
2. Enter the command:
    ```bash
    npm --version
    ```
3. If the terminal displays a version number, npm has been successfully installed.

### Step 3: Update npm (Optional)

To update npm globally to the latest version, run:
```bash
npm install -g npm
```

---

## Software and Hardware Requirements

- **IDE:** DevEco Studio 5.0.3 (downloaded and configured)
- **OpenHarmony SDK API:** 12 (downloaded)
- **Huawei Developer Account:** Required to generate signing configurations
- **Device/Emulator:** An installed OH emulator, a device with HarmonyNEXT, or a 64-bit version of OpenHarmony  
  [OpenHarmony Overview](https://docs.openharmony.cn/pages/v5.0/en/OpenHarmony-Overview.md)

---

## Building the React Native Framework from Source

### Cloning the Repository

Follow these steps to clone the project repository:

1. Open a terminal or command prompt.
2. Run the following command to clone the repository:
    ```bash
    git clone https://gitee.com/openharmony-sig/ohos_react_native.git
    ```
3. Change to the newly created project directory:
    ```bash
    cd ohos_react_native
    ```
4. Initialize and update all submodules:
    ```bash
    git submodule update --init --recursive
    ```
5. Once cloning and submodule updating are complete, the project is ready for further setup and development.

### Compilation of the Framework and Sample Tester Application

1. Open a terminal and navigate to the `react-native-harmony-cli` directory, then run:
    ```bash
    npm i && npm pack
    ```
2. Navigate to the `react-native-harmony-sample-package` directory, then run:
    ```bash
    npm i && npm pack
    ```
3. Enter the `tester` directory and run:
    ```bash
    npm run i
    ```
    _(Note: Use 'npm run i' instead of 'npm i'.)_
    
4. While in the `tester` directory, start the Metro server:
    ```bash
    npm start
    ```
5. Set the environment variable `RNOH_C_API_ARCH` to `1`.
6. Open the `tester/harmony` project in DevEco Studio and wait for background synchronization to complete.
7. Connect your device.
8. In DevEco Studio, navigate to **File > Project Structure > Signing Configs**, log in, and follow the signing process.
9. Select the `entry` configuration located at the top-right.
10. Click the **Run 'entry'** button at the top-right to launch the project.
