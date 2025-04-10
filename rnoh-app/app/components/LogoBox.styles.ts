import { StyleSheet } from 'react-native';

export const logoBoxStyles = StyleSheet.create({

  container: {
    backgroundColor: 'rgb(230, 248, 253)',
    width: '100%',
    height: 80,
    overflow: 'hidden',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },

  containerPressed: {
    backgroundColor: 'white',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },

  containerPressedTransform: {
    transform: [{ scale: 0.98 }],
  },

  image: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
});
