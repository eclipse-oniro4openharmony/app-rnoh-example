import React from 'react';
import {
  Pressable,
  Image,
  GestureResponderEvent,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { logoBoxStyles } from './LogoBox.styles';

interface LogoBoxProps {
  source: any;
  name: string;
  onPress: (name: string) => void;
  imageStyle?: StyleProp<ImageStyle>;
}

export const LogoBox: React.FC<LogoBoxProps> = ({
  source,
  name,
  onPress,
  imageStyle,
}) => {

  const handlePress = (event: GestureResponderEvent) => {
    onPress(name);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        logoBoxStyles.container,
        pressed && logoBoxStyles.containerPressed,
        pressed && logoBoxStyles.containerPressedTransform,
      ]}
      onPress={handlePress}
    >
      <Image style={[logoBoxStyles.image, imageStyle]} source={source} />
    </Pressable>
  );
};
