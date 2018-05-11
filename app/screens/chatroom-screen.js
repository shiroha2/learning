/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  IconIonic,
  ScrollView,
  TextInput,
  ListView,
} from 'react-native'

export default class ChatRoom extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
    message: ''
  }

  constructor(props) {
    super(props)
    this.coursekey = this.props.navigation.state.params.key
    this.itemsRef = firebase.database().ref(`course/${this.coursekey}/chatmessage/`)
    this.topic = ''
    this.state.dataSource = this.ds.cloneWithRows([])
  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          items.push({
              title: child.val().message,
              _name: child.val().name,
              _status: child.val().status,
              _key: child.key
          })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }

  studentName(){
    const {currentUser} = firebase.auth()
    items = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
    var name = ''
    items.on('value', (snap) => {
      name = snap.val().name
    })
    return name
  }
  statusName(){
    const {currentUser} = firebase.auth()
    items = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
    var status = ''
    items.on('value', (snap) => {
      status = snap.val().status
    })
    return status
  }

  putMessage(message){
    const {currentUser} = firebase.auth()
    userid = currentUser.uid
    name = this.studentName()
    status = this.statusName()
    const messageRef = firebase.database().ref(`course/${this.coursekey}/chatmessage/`).push({userid, name, status, message})
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        FCM.requestPermissions()
        this.topic = messageRef
        FCM.subscribeToTopic(this.topic)
      }else if (this.topic) {
        // If the user is logged-out, we unsubscribe
          FCM.unsubscribeFromTopic(this.topic);
      }
    });
  }

  componentDidMount() {
    // Call API then set data(s) into state
    this.listenForItems(this.itemsRef)
    console.ignoredYellowBox = [
    'Setting a timer'
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        {/* AppBar */}
        <View style={styles.appBar.containerStyle}>
          <TouchableOpacity
            style={styles.appBar.colLeft.containerStyle}
            onPress={() => {
              this.props.navigation.goBack()
             }}>
             <Text
               style={styles.appBar.colRight.titleTextStyle}
               numberOfLines={1}>
                 Back
             </Text>
          </TouchableOpacity>
          <View
            style={styles.appBar.colRight.containerStyle}>
            <Text
              style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
                Course Chat
            </Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
          <Text style={styles.welcome}>
              Chat
          </Text>
            <View style={styles.container}>

              <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={(data) => {
                  return (
                    <View style={{
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      padding: 10,
                    }}>
                      <Text>{ data._name }</Text>
                      <Text>{ data._status }</Text>
                      <Text>
                        { data.title }
                      </Text>
                    </View>
                  )
                }} />

              </View>
          <TextInput
            value={this.state.message}
            onChangeText={message => this.setState({message})}
          />
          <Button
            title='Send'
            onPress={() => {
              if((this.state.message).localeCompare('') != 0){
                this.putMessage(this.state.message)
                this.listenForItems(this.itemsRef)
                this.state.message = ''
              }
            }} />

        </ScrollView>

      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  appBar: {
    containerStyle: {
      flexDirection: 'row',
      height: 50,
      backgroundColor: '#F7F7F7',
    },
    colLeft: {
      containerStyle: {
        padding: 12,
        width: 40,
      },
      iconStyle: {
        color: '#969696',
        alignSelf: 'center',
        textAlignVertical: 'center',
      },
    },
    colRight: {
      containerStyle: {
        flex: 1,
        justifyContent: 'center',
      },
      titleTextStyle: {
        fontFamily: 'HelvethaicaBd',
        color: 'rgba(0, 0, 0, .8)',
        fontSize: 26,
        alignSelf: 'center',
        textAlignVertical: 'center',
        marginRight: 40,
      },
    },
  },
}
