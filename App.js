import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {AppTabNavigator} from './components/AppTabNavigator'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'

export default class App extends React.Component{
  render(){
    return (
        <AppContainer/>
    )
  }
}

const switchNavigator = createSwitchNavigator({WelcomeScreen: {screen: WelcomeScreen}, Drawer: {screen: AppDrawerNavigator}})
const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
