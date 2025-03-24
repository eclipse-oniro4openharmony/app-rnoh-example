import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,

} from 'react-native';

import { styles } from './styles';
import logoOniro from './images/oniro-logo.png';
import logoOH from './images/openharmony-logo.png';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">

        <View style={ styles.logoContainer }>

          <View style={styles.logoBox}>
            <Image style={ styles.logoOniro } source={ logoOniro } />
          </View>

          <View style={styles.logoBox}>
            <Image style={ styles.logoOH } source={ logoOH } />
          </View>     
   
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
