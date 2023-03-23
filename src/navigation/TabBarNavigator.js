import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HistoryPaymentsScreen from '../screens/history/HistoryPaymentsScreen';
import HistorySaleCreditScreen from '../screens/history/HistorySaleCreditScreen';
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

function TabBarNavigator() {
  return (
    <Tab.Navigator screenOptions={tabStyles}>
      <Tab.Screen
        name="HistoryPaymentsScreen"
        component={HistoryPaymentsScreen}
        options={{
          tabBarLabel: 'Abonos',
          tabBarIcon: ({color}) => (
            <TatunAppIcon name="icon_gastos" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="HistorySaleCreditScreen"
        component={HistorySaleCreditScreen}
        options={{
          tabBarLabel: 'Venta credito',
          tabBarIcon: ({color}) => (
            <TatunAppIcon name="icon_gastos" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabBarNavigator;
