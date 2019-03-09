import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator  } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import PickUpScreen from '../screens/PickUpScreen'
import QRScreen from '../screens/QRScreen'
import DropOffScreen from '../screens/DropOffScreen'
import RewardsScreen from '../screens/RewardsScreen'
import HistoryScreen from '../screens/HistoryScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ScanScreen from "../screens/ScanScreen";
import UsersScreen from "../screens/UsersScreen";


const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    PickUp: { screen: PickUpScreen },
    DropOff: {screen: DropOffScreen },
    QR: { screen: QRScreen },
    Rewards: {screen: RewardsScreen },
    History: {screen: HistoryScreen },
    Settings: { screen: SettingsScreen },
    Settings: { screen: SettingsScreen },
    Scan: {screen: ScanScreen},
    Users: {screen: UsersScreen}
  }, 
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  });

export default createAppContainer(AppNavigator);