import React from 'react';
import 'react-native-gesture-handler';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import StackNavigator from './src/navigation/StackNavigator';
import GlobalContext from './src/context/GlobalContext';

SQLite.DEBUG = true;

function App() {
  global.db = SQLite.openDatabase(
    {name: 'tatundb.db', createFromLocation: 1},
    () => {
      console.log('base de datos iniciada');
    },
    error => {
      Alert.alert('Ocurrio un error !', `${error}`);
    },
  );

  return (
    <GlobalContext>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GlobalContext>
  );
}

export default App;
