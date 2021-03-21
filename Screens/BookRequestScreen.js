import React from 'react'
import {View ,Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends React.Component{

    constructor(){
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            bookName: "",
            reasonToRequest: ""
        }
    }

    addRequest = (bookName, reasonToRequest) => {
        var userID = this.state.userID
        var randomRequestID = Math.random().toString(36).substring(7)
        db.collection('requested_books').add({
            "User_ID": userID,
            "Book_Name": bookName,
            "Reason_To_Request": reasonToRequest,
            "Request_ID": randomRequestID
        })

        this.setState({bookName: '', reasonToRequest: ''})
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Request Book" navigation = {this.props.navigation}/>

                <KeyboardAvoidingView style = {{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25,  margin: 10}}
                               placeholder = "Enter Book Name"
                               onChangeText = {text => {this.setState({bookName: text})}} 
                               value = {this.state.bookName} 
                    />

                    <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 300,  margin: 10}}
                               placeholder = "Reason For Requesting Book"
                               multiline
                               numberOfLines = {8}
                               onChangeText = {text => {this.setState({reasonToRequest: text})}} 
                               value = {this.state.reasonToRequest} 
                    />

                    <TouchableOpacity style = {{backgroundColor: "red", borderRadius: 5, width: 60, height: 30}}
                                      onPress = {() => {this.addRequest(this.state.bookName, this.state.reasonToRequest)}}
                    >
                        <Text> Request </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }   
}