import React from 'react'
import {View ,Text, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements/dist/list/ListItem'

export default class BookDonateScreen extends React.Component{

    constructor(){
        super()
        this.state = {
            requestedBooks: [],
        }
        this.requestRef = null
    }

    getRequestedBookList = () => {
        this.requestRef = db.collection("requested_books").onSnapshot((snapshot) => {
            var requestedBookList = snapshot.docs.map(document => document.data())
            this.setState({requestedBooks: requestedBookList})
        })
    }

    componentDidMount(){
        this.getRequestedBookList()
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item, i}) => {
        return(
            <ListItem key = {i}
                      title = {item.Book_Name}
                      subtitle = {item.Reason_To_Request}
                      titleStyle = {{color: "black", fontWeight: 'bold'}}
                      rightElement = {<TouchableOpacity style = {{width: 100, height: 30}}>
                                        <Text> View </Text>
                                      </TouchableOpacity>}
            />
        )
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Donate Books" navigation = {this.props.navigation}/>

                <View style = {{flex:1}}>
                    {this.state.requestedBooks.length === 0?
                    (<Text> List of All Requested Books </Text>): (
                        <FlatList keyExtractor = {this.keyExtractor} data = {this.state.requestedBooks} renderItem = {this.renderItem}/>
                    )}
                </View>
            </View>
        )
    }
}