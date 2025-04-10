# app-rnoh-example
Example React Native application for Oniro/OpenHarmony.


- **oh-app** - OpenHarmony application template that is a container for the actual application in React Native.

- **rnoh-app** - The actual React Native app to be embedded in the OH app.


## A quick how-to

1. The code of the sample application has already been prepared and adapted for compilation with RN, it can serve as a template for other apps.

More details:
https://gitee.com/openharmony-sig/ohos_react_native/blob/0.72.5-ohos-5.0-release/docs/en/environment-setup.md

2. Create a JS bundle with RN app: 
```
$ cd rnoh-app
$ npm run dev
```
3. Copy generated budle to the OH app:

Copy the entire contents of the directory:
```
rnoh-app/harmony/entry/src/main/resources/rawfile
``` 
to the directory:
```
oh-app/entry/src/main/src/main/resources/rawfile
```
4. Compile the **oh-app** with the DevEco.
