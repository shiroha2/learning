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
    const {currentUser} = firebase.auth()
    this.itemsRef = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
  }
  componentDidMount(){
    console.ignoredYellowBox = [
    'Setting a timer'
    ]

  }

  state = {
    name: this.getNameUser(),
    email: this.getEmailUser()
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
    itemsRef.on('value', (snap) =>{
      if((snap.val().iduser).localeCompare(currentUser.uid)){
        return true
      }
    })
    return false
  }
  userCheckStudent(itemsRef){
    itemsRef.on('value', (snap) =>{
      if((snap.val().status).localeCompare('student') == 0){
        return true
      }
    })
    return false
  }
  userCheckTeacher(itemsRef){
    itemsRef.on('value', (snap) =>{
      if((snap.val().status).localeCompare('teacher') == 0){
        return true
      }
    })
    return false
  }
  getNameUser(){
    const {currentUser} = firebase.auth()
    items = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
    var name = ''
    items.on('value', (snap) => {
      name = snap.val().name
    })
    return name
  }
  getEmailUser(){
    const {currentUser} = firebase.auth()
    itemsRef = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
    var email = ''
    itemsRef.on('value', (snap) =>{
        email = snap.val().email
    })
    return email
  }

  _signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      const {navigate} = this.props.navigation
      navigate('MainScreen')
    }).catch(function(error) {
      // An error happened.

    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
        <Text style={styles.welcome}>
          Name
        </Text>
        <TextInput
          value = {this.state.name = this.getNameUser()}
          onChangeText={name => this.setState({ name })}
          style={{ height: 50, width: 200 }}
        />
        <Text style={styles.welcome}>
          E-mail
        </Text>
        <TextInput
          value = {this.state.email = this.getEmailUser()}
          onChangeText={email => this.setState({ email })}
          style={{ height: 50, width: 200 }}
        />

        <Button
          title='Student'
          onPress={() => {

                this.userStudentCreate(this.state.name , this.state.email)
              }

          }
        />

        <Button
          title='Teacher'
          onPress={() => {

                  this.userTeacherCreate(this.state.name , this.state.email)
              }

          }
        />
        <View>
          <Button
            title='Sign out'
            onPress={() => {
              this._signOut()
              const {navigate} = this.props.navigation
              navigate('MainScreen')
            }}/>
        </View>
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
