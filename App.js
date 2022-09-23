//import react
import React, {Component} from 'react';
import 'react-native-gesture-handler';
//import components
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import {Alert} from 'react-native';
//import services
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
  {name: 'tatundb.db', createFromLocation: 1},
  () => {
    Alert.alert('Connected with success !');
  },
  error => {
    Alert.alert('Something went wrong !', `${error}`);
  },
);

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
