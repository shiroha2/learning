/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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


} from 'react-native'

import firebase from 'firebase'

export default class Page6NewScreen extends Component {

  constructor(props) {
    super(props)
    this.coursekey = this.props.navigation.state.params.key
  }

  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  state = {
    password: ''
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

  checkPassword(coursekey, passwordItem){
    const {currentUser} = firebase.auth()
    studentid = currentUser.uid
    name = this.studentName()
    itemPassword = firebase.database().ref(`/course/${coursekey}`)
    var passwordCourse = ''
    itemPassword.on('value', (snap) => {
      passwordCourse = snap.val().password
    })
    if(passwordCourse.localeCompare(passwordItem) == 0){
      firebase.database().ref(`/course/${coursekey}/students`).push({studentid, name})
      const { navigate } = this.props.navigation
      navigate('Page4Screen', {key: this.props.navigation.state.params.key})
    }
  }

/**  goInCourse(coursekey, password){
    const {currentUser} = firebase.auth()
    if(this.checkPassword(coursekey, password)){
      const { navigate } = this.props.navigation
      navigate('Page4Screen', {key: this.props.navigation.state.params.key})
    }else{
      const { navigate } = this.props.navigation
      navigate('Page3Screen')
    }
  }**/

  render() {
    return (
      <View style={styles.container}>
        {/* AppBar */}
        <View style={styles.appBar.containerStyle}>
          <TouchableOpacity
            style={styles.appBar.colLeft.containerStyle}
            onPress={() => {this.props.navigation.goBack()
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
              Course
            </Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
            <View style={styles.container}>

              <Text style={styles.welcome}>
                Course Password
              </Text>
              <TextInput
                   value={this.state.password}
                   onChangeText={password => this.setState({ password })}
                 />
            </View>

            <Button
            title='Class password'
            onPress={() => {
            this.checkPassword(this.props.navigation.state.params.key, this.state.password)
            //  const { navigate } = this.props.navigation
          //    navigate('Page4Screen', {key: this.props.navigation.state.params.key})
            }}
            />



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
  appBar2: {
    containerStyle: {
      flexDirection: 'row',
      height: 50,
      backgroundColor: '#F7F7F7',
    },
    colLeft: {
      containerStyle: {
        flexDirection: 'row'
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
