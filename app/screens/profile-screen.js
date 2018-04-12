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
  }
  state = {
    name: 'default',
    email: 'default@default.com'
  }

  userStudentCreate(name , email){
    status = 'student'
    const {currentUser} = firebase.auth()
    iduser = currentUser.uid
    firebase.database().ref(`/users/iduser`).push({iduser, name, email,status})
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
    firebase.database().ref(`/users/iduser`).push({iduser, name, email,status})
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
