import { StyleSheet } from 'react-native';

export const linearGradientColors = [
  'rgb(255,255,255)',
  'rgb(43, 148, 177)'
];

export const appStyles = StyleSheet.create({

  linearGradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(43, 133, 158)'
  },

  topContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
  },

  bottomContainer: {
    flex: 1,
  },

  logoContainer: {
    flexDirection: 'column',
  },

  titleText: {
    fontSize: 24,        
    fontWeight: 'bold',  
    color: '#fff',    
    textAlign: 'center',
    marginBottom: 24,  

    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

});