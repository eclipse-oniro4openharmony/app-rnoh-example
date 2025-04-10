import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Animated,
  Dimensions,
  Text,
  View,
  ScrollView as RNScrollView,
} from 'react-native';

import { appStyles } from './App.styles';
import { LogoBox } from './components/LogoBox';

import logoRN from './images/reactnative-logo.png';
import logoOniro from './images/oniro-logo.png';
import logoOH from './images/openharmony-logo.png';

import { Carousel } from './components/Carousel';
import { Screen1 } from './screens/Screen1';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';

const screenWidth = Dimensions.get('window').width;

/**
 * Main application component.
 * Displays a welcome screen with animated logos and a carousel of screens.
 * @returns {JSX.Element} The rendered App component.
 */
function App(): JSX.Element {

  // Animated value for sliding animation of the logo container
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  // Reference to the ScrollView used for the carousel
  const carouselRef = useRef<RNScrollView>(null);

  /**
   * useEffect hook to start the sliding animation when the component mounts.
   */
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,             // Slide to the initial position
      duration: 200,          // Animation duration in milliseconds
      useNativeDriver: true,  // Use native driver for better performance
    }).start();
  }, [slideAnim]);

  /**
   * Handles the press event on a logo.
   * Scrolls the carousel to the corresponding page based on the logo pressed.
   * @param {string} logoName - The name of the logo pressed.
   */
  const handleLogoPress = (logoName: string) => {
    let pageIndex = 0;

    // Determine the page index based on the logo name
    if (logoName === "react-native") {
      pageIndex = 0;
    } else if (logoName === "oniro") {
      pageIndex = 1;
    } else if (logoName === "open-harmony") {
      pageIndex = 2;
    }

    // Scroll the carousel to the selected page
    carouselRef.current?.scrollTo({ x: pageIndex * screenWidth, animated: true });

    console.log(`${logoName} pressed, scrolling to page ${pageIndex}`);
  };

  return (
    <SafeAreaView style={appStyles.safeArea}>

      {/* Top container with title and animated logo section */}

      <View style={appStyles.topContainer}>
        <Text style={appStyles.titleText}>
          Welcome to React Native{"\n"}for Open Harmony
        </Text>

        {/* Animated logo container */}
        
        <Animated.View
          pointerEvents="box-none"
          style={[
            appStyles.logoContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={appStyles.logoContainer}>
 
            <LogoBox
              source={logoRN}
              name="react-native"
              onPress={handleLogoPress}
              imageStyle={{ width: 210, tintColor: 'rgb(5 , 165, 209)' }}
            />

            <LogoBox
              source={logoOniro}
              name="oniro"
              onPress={handleLogoPress}
              imageStyle={{ width: 160 }}
            />

            <LogoBox
              source={logoOH}
              name="open-harmony"
              onPress={handleLogoPress}
              imageStyle={{ width: 330 }}
            />
          </View>
        </Animated.View>
      </View>

      {/* Bottom container with the carousel */}

      <View style={appStyles.bottomContainer}>       
        <Carousel carouselRef={carouselRef}>
          <Screen1 />
          <Screen2 />
          <Screen3 />
        </Carousel>
      </View>
    </SafeAreaView>
  );
}

export default App;
