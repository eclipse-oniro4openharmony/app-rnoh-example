// screens/Screen1.tsx
import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../components/Screen';

export const Screen1 = () => {
  return (
    <Screen backgroundColor="rgb(214, 244, 252)" title="React Native">
      <Text>
        React Native is an open-source framework developed by Facebook that allows developers to build mobile applications using JavaScript and React. It provides a native look and feel by rendering components with native APIs, resulting in high performance and a smooth user experience across both iOS and Android devices.
        {"\n\n"}
        One of the key benefits of React Native is its ability to share code between platforms. Developers can write a single codebase that works on multiple mobile operating systems, significantly reducing development time and maintenance costs. This cross-platform approach fosters faster innovation and easier updates for mobile apps.
      </Text>
    </Screen>
  );
};
