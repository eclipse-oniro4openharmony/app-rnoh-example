import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../components/Screen';

export const Screen3 = () => {
  return (
    <Screen backgroundColor="rgb(226, 253, 240)" title="Open Harmony">
      <Text>
        OpenHarmony is an innovative open-source distributed operating system that enables seamless connectivity and intelligent collaboration across a wide range of devices. Developed under the guidance of key industry players and the OpenAtom Foundation, it is designed to support everything from smartphones and smart wearables to IoT devices and appliances.
        {"\n\n"}
        Its robust architecture facilitates a unified user experience, regardless of the device type, making it a versatile platform for modern smart ecosystems.
      </Text>
    </Screen>
  );
};
