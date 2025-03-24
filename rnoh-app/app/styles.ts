import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoContainer: {
    flexDirection: 'column',
    padding: 16,
  },
  logoBox: {
    backgroundColor: 'rgba(196, 196, 196, 0.5)', 
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOniro: {
    width: 210,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  logoOH: {
    width: 350,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
});
