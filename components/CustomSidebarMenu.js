import React, {Component, version} from 'react'
import { View,StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'

export default class CustomSidebarMenu extends Component{
    render(){
        return(
            <View style = {{flex: 1}}>
                <View style = {{flex: 0.8}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {{flex: 0.2, justifyContent: 'flex-end', paddingBottom: 30}}>
                    <TouchableOpacity style = {{height:30, width: '100%', justifyContent: 'center', padding: 5}}
                                      onPress = {() => {this.props.navigation.navigate('WelcomeScreen')
                                                        firebase.auth().signOut()}}>
                        <Text> Logout </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}