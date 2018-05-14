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
    this.state = {
      loading: true
    }
    this.itemsRef = firebase.database().ref(`/users/iduser/`)
  }
  componentDidMount(){
    console.ignoredYellowBox = [
    'Setting a timer'
    ]
  }

  state = {
    email: '',
    password:'',
    error:'',
    redirectToHome: false
  }

  _signUp(email, password){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(result => {
          this.setState({ redirectToHome: true })
      }).catch(error => {
          // Handle Errors here.
          this.setState({ error: error})
          this.setState({ redirectToNext: false })

      })
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

       <TextInput
            secureTextEntry={true}
            autoCorrect={false}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ height: 50, width: 200 }}
          />

        <Button
          title='SignUp'
          onPress={(userid) => {
            this._signUp(this.state.email, this.state.password)
            if(this.state.redirectToHome){
              this.userDefaultCreate(this.state.email)
              const {navigate} = this.props.navigation
              navigate('Page2Screen')
            }
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
