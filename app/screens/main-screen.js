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
  GoogleSignin,
  GoogleSigninButton
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
      apiKey: 'AIzaSyDJwDtP3iaG5fZ_p8-3kayQC4eTlMeY2h0',
      authDomain: 'learninghpapp.firebaseapp.com',
      databaseURL: 'https://learninghpapp.firebaseio.com',
      projectId: 'learninghpapp',
      storageBucket: 'learninghpapp.appspot.com',
      messagingSenderId: '849804559418'
    }
    //!firebase.apps.length ?
    firebase.initializeApp(config)//: firebase.app()
    GoogleSignin.configure({
      webClientId: '849804559418-u11iup8ent00klagiru4bri809hovhap.apps.googleusercontent.com'
    })
    console.ignoredYellowBox = [
    'Setting a timer'
    ]
  }

  state = {
    email: '',
    password: '',
    error: '',
    redirectToNext: false
  }

  onButtonPress(email , password) {
    firebase.auth().signInWithEmailAndPassword(email, password/**testEmail,testPassword**/).then(result => {
        this.setState({ redirectToNext: true })
      }).catch(error => {
        // Handle Errors here.
        this.setState({ error: error})

      })
        /**.catch((signInError) => {
          const { navigate } = this.props.navigation
          navigate('PageRegisterScreen')
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((signUpError) => {
              this.setState({ error: 'Authentication Failed.' });
            })
        })**/

  }

  _signIn(){
    GoogleSignin.signIn().then((data)=>{
       const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

       return firebase.auth().signInWithCredential(credential)
        .then((user)=>{
          console.log(`Google Login with user: ${JSON.stringify(user.toJSON())}`)
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
        <Text>{this.state.error}</Text>
        <Button
          title='Log in'
          onPress = {(userid) => {
            this.onButtonPress(this.state.email , this.state.password)
            if(this.state.redirectToNext){
              const { navigate } = this.props.navigation
              navigate('Page2Screen')
            }
          }
        }
        />
        <Button
            title='Register'
            onPress = {() => {
              this.state.error = ''
                const { navigate } = this.props.navigation
                navigate('PageRegisterScreen')

            }
          }
          />
        <GoogleSigninButton
          style={{width: 48, height: 48}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={
            this._signIn.bind(this)
        //    const { navigate } = this.props.navigation
        //    navigate('Page2Screen')
          }

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
