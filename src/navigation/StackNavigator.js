import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/login/LoginScreen';
import MenuScreen from '../screens/menu/MenuScreen';
import ClientsScreen from '../screens/client/ClientsScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import SaleCreditScreen from '../screens/sale_credit/SaleCreditScreen';
import UpdateClientScreen from '../screens/update/UpdateClientScreen';
import InventoryScreen from '../screens/inventory/InventoryScreen';
import SaleCashScreen from '../screens/sale_cash/SaleCashScreen';
import SpentScreen from '../screens/spent/SpentScreen';
import SalesScreen from '../screens/sales/SalesScreen';
import FinishSaleScreen from '../screens/finish/FinishSaleScreen';
import TabBarNavigator from './TabBarNavigator';
import AuthorizationScreen from '../screens/authorization/AuthorizationScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        options={{headerShown: false}}
        component={SplashScreen}
      />
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
        name="ClientsScreen"
        options={{headerShown: false}}
        component={ClientsScreen}
      />
      <Stack.Screen
        name="PaymentScreen"
        options={{headerShown: false}}
        component={PaymentScreen}
      />
      <Stack.Screen
        name="SaleCreditScreen"
        options={{headerShown: false}}
        component={SaleCreditScreen}
      />
      <Stack.Screen
        name="UpdateClientScreen"
        options={{headerShown: false}}
        component={UpdateClientScreen}
      />
      <Stack.Screen
        name="InventoryScreen"
        options={{headerShown: false}}
        component={InventoryScreen}
      />
      <Stack.Screen
        name="SaleCashScreen"
        options={{headerShown: false}}
        component={SaleCashScreen}
      />
      <Stack.Screen
        name="SpentScreen"
        options={{headerShown: false}}
        component={SpentScreen}
      />
      <Stack.Screen
        name="SalesScreen"
        options={{headerShown: false}}
        component={SalesScreen}
      />
      <Stack.Screen
        name="FinishSaleScreen"
        options={{headerShown: false}}
        component={FinishSaleScreen}
      />
      <Stack.Screen
        name="TabBarNavigator"
        options={{headerShown: false}}
        component={TabBarNavigator}
      />
      <Stack.Screen
        name="AuthorizationScreen"
        options={{headerShown: false}}
        component={AuthorizationScreen}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
