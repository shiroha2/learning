/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import firebase from 'firebase'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker
} from 'react-native'

import {
    USER_UPDATE,
    USER_CREATE
} from '../type/types'

//import { Actions } from 'react-native-router-flux'

export default class Page2Screen extends Component {

  constructor(props) {
    super(props)
    this.itemsRef = firebase.database().ref(`/users/iduser`)
  }

  state = {
    name: 'default',
    email: 'default@default.com'
  }

  userStudentCreate(name , email){
    status = 'student'
    const {currentUser} = firebase.auth()
    iduser = currentUser.uid
    firebase.database().ref(`/users/iduser/${currentUser.uid}`).update({iduser, name, email,status})
    console.log(name, email, status)
    /**return(dispatch)=> {
      student.push({ name, email, status})
        .then(() => {
          dispatch({type: USER_CREATE})
          Actions.Page3Screen({type: 'reset'})
        })
    }**/
    const { navigate } = this.props.navigation
    navigate('Page3Screen')

  }
  userTeacherCreate(name, email){
    status = "teacher"
    const {currentUser} = firebase.auth()
    iduser = currentUser.uid
    firebase.database().ref(`/users/iduser/${currentUser.uid}`).update({iduser, name, email,status})
    console.log(name, email, status)
    /**return(dispatch)=> {
      teacher.push({name, email, status})
        .then(() => {
          dispatch({type: USER_CREATE})
          Actions.Page6Screen({type: 'reset'})
        })
    }**/
    const { navigate } = this.props.navigation
    navigate('Page6Screen')
  }

  userCheck(itemsRef){
    const {currentUser} = firebase.auth()
      itemsRef.on('value', (snap) => {

          var items = []
          snap.forEach((child) => {
            if(child.val().iduser == currentUser.uid){
              return true
            }
          })
      })
      return false
  }
  userCheckStudent(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          if(child.val().status == 'student'){
            return true
          }
        })
    })
    return false
  }
  userCheckTeacher(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          if(child.val().status == 'teacher'){
            return true
          }
        })
    })
    return false
  }

  render() {
    if(this.userCheck(this.itemsRef)){
      if(this.userCheckStudent(this.itemsRef)){
        const {navigate} = this.props.navigation
        navigation('Page3Screen')
      }else if(this.userCheckTeacher(this.itemsRef)){
        const {navigate} = this.props.navigation
        navigation('Page6Screen')
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
        <Text style={styles.welcome}>
          Name
        </Text>
        <TextInput
          value = {this.state.name}
          onChangeText={name => this.setState({ name })}
          style={{ height: 50, width: 200 }}
        />
        <Text style={styles.welcome}>
          E-mail
        </Text>
        <TextInput
          value = {this.state.email}
          onChangeText={email => this.setState({ email })}
          style={{ height: 50, width: 200 }}
        />

        <Button
          title='Student'
          onPress={() => {
            this.userStudentCreate(this.state.name , this.state.email)
          }}
        />

        <Button
          title='Teacher'
          onPress={() => {
            this.userTeacherCreate(this.state.name , this.state.email)
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})
