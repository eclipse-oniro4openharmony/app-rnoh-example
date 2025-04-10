import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  screen: {
    width: screenWidth,
    flex: 1,
    padding: 16,
  },
  screenContent: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#444',
  },
});
