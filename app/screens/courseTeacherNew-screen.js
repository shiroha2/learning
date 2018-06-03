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
  Alert

} from 'react-native'

import firebase from 'firebase'

export default class Page6NewScreen extends Component {

  constructor(props) {
    super(props)
    this.state.password = this.generate()
  }

  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  state = {
    courseName: '',
    desciption: '',
    password: ''
  }

  randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
  }
  generate() {
    var password = this.randomPassword(8);
    return password
  }

  courseCreate(courseName, desciption, password){
    state = 'undeploy'
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const course = firebase.database().ref(`/course/`)
    course.push({courseName, desciption, state, teacherid, password})
  }
  courseCreateDeploy(courseName, desciption, password){
    state = 'deploy'
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const course = firebase.database().ref(`/course/`)
    course.push({ courseName, desciption, state, teacherid, password})
  }
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
                course name
              </Text>
              <TextInput
                value = {this.state.courseName}
                onChangeText={courseName => this.setState({ courseName })}
              />
              <Text style={styles.welcome}>
                desciption
              </Text>
              <TextInput
                value = {this.state.desciption}
                onChangeText={desciption => this.setState({ desciption })}
              />
              <Text style={styles.welcome}>
                Password Course Please save
              </Text>
              <Text style={styles.welcome}>
                {this.state.password}
              </Text>
            </View>

            <Button
            title='Save'
            onPress={() => {
              this.courseCreate(this.state.courseName , this.state.desciption, this.state.password)
              this.props.navigation.goBack()
            }}
            />
            <Button
            title='Deploy'
            onPress={() => {
              Alert.alert(
                'ALERT',
                'Would you like to DEPLOY this course',
                [
                  {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                  {text: 'Ok' , onPress:() =>
                    this.courseCreateDeploy(this.state.courseName , this.state.desciption, this.state.password)
                  },
                ],
                {cancalable: false}

              )
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
