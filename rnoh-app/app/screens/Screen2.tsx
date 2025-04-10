import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../components/Screen';

export const Screen2 = () => {
  return (
    <Screen backgroundColor="rgb(253, 252, 237)" title="Oniro">
      <Text>
        Oniro is an Eclipse Foundation Project dedicated to the development of an open source vendor-neutral Operating System (OS) platform. The Oniro Project was established through a collaboration between two global open source foundations: The Eclipse Foundation and The OpenAtom Foundation.
        {"\n\n"}
        Leveraging the solid foundation of OpenHarmony, an open source project operated by the OpenAtom Foundation, Oniro builds upon an operating system platform known for its versatility across a wide range of smart devices.
       </Text>
    </Screen>
  );
};
