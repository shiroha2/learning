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
    email: 'default@default.com',
    password:'',
    error:''
  }

  _signUp(email , password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(() => {
            this.setState({ error: 'Authentication Failed.' });
          });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Register
        </Text>
        <Text>
          ID
        </Text>
        <TextInput
            value={this.state.email}
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            style={{ height: 50, width: 200 }}
          />
        <Text>
          Password
        </Text>
        <Text
          value={this.state.error}
        />
       <TextInput
            secureTextEntry={true}
            autoCorrect={false}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ height: 50, width: 200 }}
          />

        <Button
          title='SignUp'
          onPress={() => {
            this._signUp(this.state.email , this.state.password)
            const { navigate } = this.props.navigation
            navigate('MainScreen')
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
