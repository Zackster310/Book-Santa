import React from 'react'
import {View ,Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import MyHeader from '../components/MyHeader'

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docID: ''
        }
    }

    render(){
        return(
            <View>
                <MyHeader title = "Settings" navigation = {this.props.navigation}/>

                <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}} 
                    placeholder = {"First Name"} 
                    maxLength = {8} 
                    onChangeText = {(text) => {this.setState({firstName: text})}}
                />
                
                <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}} 
                    placeholder = {"Last Name"} 
                    maxLength = {8} 
                    onChangeText = {(text) => {this.setState({lastName: text})}}
                />

                <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}} 
                    placeholder = {"Address"} 
                    multiline = {true} 
                    onChangeText = {(text) => {this.setState({address: text})}}
                />

                <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}} 
                    placeholder = {"Contact"} 
                    keyboardType = {'numeric'}
                    maxLength = {10} 
                    onChangeText = {(text) => {this.setState({contact: text})}}
                />

                <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25,  margin: 10}}
                    placeholder = {"example@booksanta.com"}
                    keyboardType = "Email-Address"
                    onChangeText = {text => {this.setState({email: text})}}
                />
            </View>
        )
    }
}