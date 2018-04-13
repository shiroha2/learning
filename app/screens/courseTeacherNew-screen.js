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
  }

  state = {
    courseName: '',
    desciption: ''
  }

  courseCreate(courseName, desciption){
    state = 'undeploy'
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const course = firebase.database().ref(`/course/`)
    course.push({courseName, desciption, state, teacherid})
  }
  courseCreateDeploy(courseName, desciption){
    state = 'deploy'
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const course = firebase.database().ref(`/course/`)
    course.push({ courseName, desciption, state, teacherid})
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
            <Text>
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
                style={{ height: 50, width: 200 }}
              />
              <Text style={styles.welcome}>
                desciption
              </Text>
              <TextInput
                value = {this.state.desciption}
                onChangeText={desciption => this.setState({ desciption })}
                style={{ height: 50, width: 300 }}
              />
            </View>

            <Button
            title='Save'
            onPress={() => {
              this.courseCreate(this.state.courseName , this.state.desciption)
              this.props.navigation.goBack()
            }}
            />
            <Button
            title='Deploy'
            onPress={() => {
              this.courseCreateDeploy(this.state.courseName , this.state.desciption)
              this.props.navigation.goBack()
            }}
            />
            <Button
            title='Back to Main screen'
            onPress={() => {
              this.props.navigation.goBack()
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
