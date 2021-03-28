import React, {Component, version} from 'react'
import { View,StyleSheet, Text } from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSidebarMenu from './CustomSidebarMenu'
import SettingsScreen from '../Screens/SettingsScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {screen: AppTabNavigator},
    Settings: {screen: SettingsScreen}
},{
    contentComponent: CustomSidebarMenu
},{
    initialRouteName: 'Home'
}
)