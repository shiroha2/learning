import React, { Component } from 'react'
import {
  Platform,
  Text,
  View,
  Button,
  Image,
  TextInput
} from 'react-native'

import firebase from 'firebase'
import {
  GoogleSignin
} from 'react-native-google-signin'

export default class MainScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }


  componentDidMount() {
    console.log('DEBUG_TAG', 'This message will appear on Android Studio')
    const config = {
      apiKey: "AIzaSyDJwDtP3iaG5fZ_p8-3kayQC4eTlMeY2h0",
      authDomain: "learninghpapp.firebaseapp.com",
      databaseURL: "https://learninghpapp.firebaseio.com",
      projectId: "learninghpapp",
      storageBucket: "learninghpapp.appspot.com",
      messagingSenderId: "849804559418"
    }
    firebase.initializeApp(config)
  }

  state = {
    email: '',
    password: '',
    error: ''
  }

  onButtonPress() {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(() => {
            this.setState({ error: 'Authentication Failed.' });
          })
      })

  }
  onButtonLoginGoogle(){
    GoogleSignin.signIn().then((data)=>{
       const credential = firebase.auth.GithubAuthProvider.credential(data.idToken,data.accessToken)
       return firebase.auth().signInWithCredential(credential)
        .then((user)=>{
          const { navigate } = this.props.navigation
          navigate('Page2Screen')
        }).catch((error)=>{
          const { code, message } = error
        })
    })
  }


  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Image
        style={{width: 150, height: 150}}
        source={require('/Users/supakitsujaritcheewawong/learninghpapp/app/images/app-iron.png')}/>
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        }}>
          Learning HP
        </Text>
        <Text>
          ID
        </Text>

        <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={{ height: 50, width: 200 }}
          />
        <Text>
          Password
        </Text>
       <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ height: 50, width: 200 }}
          />
        <Button
          title='Log in'
          onPress = {() => {
            this.onButtonPress.bind(this)
            const {navigate} = this.props.navigation
            navigate('Page2Screen')
          }
        }
        />

        <Button
          title='Log in with google'
          onPress={() => {
              this.onButtonLoginGoogle()
          }} />
          <Button
            title= 'next'
            onPress={() => {
              const {navigate} = this.props.navigation
              navigate('Page2Screen')
            }}
          />
      </View>
    )
  }
}

const styles = {
  errorTextStyle: {
    alignSelf: 'center',
    color: 'red'
  }
}
