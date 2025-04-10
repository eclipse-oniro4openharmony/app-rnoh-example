import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { styles } from './Screen.styles';

/**
 * Props for the Screen component.
 * @property {string} backgroundColor - The background color of the screen.
 * @property {string} title - The title text displayed at the top of the screen.
 * @property {React.ReactNode} children - The content to be displayed within the screen.
 */
interface ScreenProps {
  backgroundColor: string;
  title: string;
  children: React.ReactNode;
}

/**
 * A reusable Screen component that provides a styled container with a title and content.
 * @param {ScreenProps} props - The props for the Screen component.
 * @returns {JSX.Element} The rendered Screen component.
 */
export const Screen: React.FC<ScreenProps> = ({ backgroundColor, title, children }) => {
  return (
    <View style={[styles.screen, { backgroundColor }]}>

      {/* Render the title text */}

      <Text style={styles.titleText}>
        {title}
      </Text>
      
      {/* Render the children content */}

      <Text style={styles.contentText}>
        {children}
      </Text>
    </View>
  );
};
