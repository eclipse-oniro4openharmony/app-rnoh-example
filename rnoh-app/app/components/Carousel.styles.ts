import { StyleSheet } from 'react-native';

export const carouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: 'rgb(207, 237, 245)'
  },
  activeDot: {
    backgroundColor: 'rgb(21, 99, 121)',
  },
});
