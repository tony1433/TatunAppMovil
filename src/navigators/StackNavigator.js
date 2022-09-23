import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
//imports screen
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CostumersScreen from '../screens/CostumersScreen';
import TabBarNavigator from './TabBarNavigator';

const Stack = createStackNavigator();

class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="MenuScreen"
          options={{headerShown: false}}
          component={MenuScreen}
        />
        <Stack.Screen
          name="CostumersScreen"
          options={{headerShown: false}}
          component={CostumersScreen}
        />
        <Stack.Screen
          name="TabBarNavigator"
          options={{headerShown: false}}
          component={TabBarNavigator}
        />
      </Stack.Navigator>
    );
  }
}

export default StackNavigator;
