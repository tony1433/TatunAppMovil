import React, {Component} from 'react';
//import components
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
//imports screen
import PaymentScreen from '../screens/PaymentScreen';
import SaleCreditScreen from '../screens/SaleCreditScreen';
import HistoryScreen from '../screens/HistoryScreen';
//imports icons and images
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';

const Tab = createMaterialTopTabNavigator();

const tabStyles = {
  tabBarPressColor: '#1190CB',
  tabBarActiveTintColor: '#1190CB',
  tabBarLabelStyle: {fontSize: 10},
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
};

class TabBarNavigator extends Component {
  render() {
    const {costumer} = this.props.route.params;
    return (
      <Tab.Navigator screenOptions={tabStyles}>
        <Tab.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          initialParams={{infoCostumer: costumer}}
          options={{
            tabBarLabel: 'Abono',
            tabBarIcon: ({color}) => (
              <TatunAppIcon name="icon_abono" color={color} size={23} />
            ),
          }}
        />
        <Tab.Screen
          name="SaleCreditScreen"
          component={SaleCreditScreen}
          initialParams={{infoCostumer: costumer}}
          options={{
            tabBarLabel: 'Venta',
            tabBarIcon: ({color}) => (
              <TatunAppIcon name="icon_abono" color={color} size={23} />
            ),
          }}
        />
        <Tab.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          initialParams={{infoCostumer: costumer}}
          options={{
            tabBarLabel: 'Historial',
            tabBarIcon: ({color}) => (
              <TatunAppIcon name="icon_gastos" color={color} size={23} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default TabBarNavigator;
