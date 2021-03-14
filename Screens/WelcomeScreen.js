import React from 'react'
import {View ,Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import SantaAnimation from '../components/santa'

export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: false
        }
    }

    showModal = () => {
        return(
            <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible}>
                <View style = {{flex: 1, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#9ef4ff", 
                                marginRight: 30, marginLeft: 30, marginTop: 80, marginBottom: 80}}>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Text> Registration </Text>

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

                            <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}}
                                       placeholder = {"Password"}
                                       secureTextEntry = {true}
                                       onChangeText = {text => {this.setState({password: text})}}
                            />

                            <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}}
                                       placeholder = {"Confirm Password"}
                                       secureTextEntry = {true}
                                       onChangeText = {text => {this.setState({confirmPassword: text})}}
                            />

                            <TouchableOpacity style = {{height: 30, width:55, backgroundColor: "red", borderWidth: 2, margin: 15}}
                                              onPress = {() => {this.signUp(this.state.email, this.state.password, this.state.confirmPassword)}}
                            >
                                <Text> Register </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {{height: 30, width:55, backgroundColor: "green", borderWidth: 2, margin: 15}}
                                              onPress = {() => {this.setState({isModalVisible: false})}}
                            >
                                <Text> Cancel </Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {console.log("here");this.props.navigation.navigate('DonateBooks')})
        .catch((error) => {return Alert.alert(error.message())})
    }

    signUp = (email, password, confirmPassword) => {
        if(password != confirmPassword){
            return(
                Alert.alert("Passwords do not match")
            )
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email_address: this.state.email,
                    address: this.state.address,
                    contact: this.state.contact
                })
                return Alert.alert("Sign Up Successful",
                    '', [{text: 'OK', onPress: () => this.setState({isModalVisible: false})}]
                )})

            .catch((error) => {return Alert.alert(error.message())})
        }
    }

    render(){
        return(
            <View style = {{backgroundColor: 'lightGray', flex: 1}}>
                <View style = {{justifyContent: "center", alignItems: "center"}}>
                    {this.showModal()}
                </View>
                <View style = {{backgroundColor: 'lightGray', flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style = {{fontWeight: 'bold', textDecoration: 'underline'}}> Book Santa </Text>

                    <SantaAnimation/>

                    <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25,  margin: 10}}
                               placeholder = "example@booksanta.com"
                               placeholderTextColor = "#fff"
                               keyboardType = "email-address"
                               onChangeText = {text => {this.setState({email: text})}}
                    />

                    <TextInput style = {{borderRadius: 5, borderWidth: 2.5, width: 150, height: 25, margin: 10}}
                               placeholder = "password"
                               placeholderTextColor = "#fff"
                               secureTextEntry = {true}
                               onChangeText = {text => {this.setState({password: text})}}
                    />
                

                    <TouchableOpacity style = {{height: 30, width:55, backgroundColor: "red", borderWidth: 2, margin: 15}}
                                      onPress = {() => {this.login(this.state.email, this.state.password)}}
                    >
                        <Text> Login </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{height: 30, width:55, backgroundColor: "green", borderWidth: 2, margin: 15}}
                                      onPress = {() => {this.setState({isModalVisible: true})}}
                    >
                        <Text> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}