import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { carouselStyles } from './Carousel.styles';

const screenWidth = Dimensions.get('window').width;

/**
 * Props for the Carousel component.
 */
interface CarouselProps {
  /**
   * A reference to the ScrollView component.
   */
  carouselRef: React.RefObject<ScrollView>;

  /**
   * The child components to be displayed inside the carousel.
   */
  children: React.ReactNode;
}

/**
 * A horizontal carousel component with pagination dots.
 * 
 * @param {CarouselProps} props - The props for the Carousel component.
 * @returns {JSX.Element} The rendered Carousel component.
 */
export const Carousel: React.FC<CarouselProps> = ({ carouselRef, children }) => {

  // State to track the currently active page in the carousel.
  const [activePage, setActivePage] = useState(0);

  /**
   * Handles the scroll event of the carousel and updates the active page.
   * 
   * @param {NativeSyntheticEvent<NativeScrollEvent>} event - The scroll event.
   */
  const handleCarouselScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    
    const x = event.nativeEvent.contentOffset.x;      // Get the horizontal scroll position.
    const currentPage = Math.round(x / screenWidth);  // Calculate the current page based on scroll position.
    setActivePage(currentPage);                       // Update the active page state.
  };

  // Calculate the total number of pages based on the number of children.
  const numPages = React.Children.count(children);

  return (
    <View style={carouselStyles.container}>

      {/* ScrollView for horizontal scrolling of child components */}

      <ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        onScroll={handleCarouselScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* Pagination dots to indicate the active page */}

      <View style={carouselStyles.dotContainer}>
        {Array.from({ length: numPages }).map((_, index) => (
          <View
            key={index}
            style={[
              carouselStyles.dot,
              activePage === index && carouselStyles.activeDot, // Highlight the active dot.
            ]}
          />
        ))}
      </View>
    </View>
  );
};
