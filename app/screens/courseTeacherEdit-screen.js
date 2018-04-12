/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase'
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
  ListView

} from 'react-native'

export default class Page6EditScreen extends Component {

  constructor(props) {
    super(props)
    this.itemRef = firebase.database().ref(`/course`)

  }
  componentDidMount(){
    this.listenForItems(this.itemRef)
  }

  listenForItems(itemsRef){
    courseKey = this.props.navigation.state.params.key
    itemsRef.on('value', (snap) => {
        var items = []
        snap.forEach((child) => {
          if(child.val().key == courseKey){
            items.push({
                title: child.val().courseName,
                _key: child.key
              })
            }
        })
    })
  }

  state = {
    courseName: '',
    desciption: ''
  }

  courseUpdateUndaploy(courseName, desciption){
    state = 'undeploy'
    courseKey = this.props.navigation.state.params.key
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid

    const course = firebase.database().ref(`/course/${courseKey}`)
    course.update({courseName, desciption, state, teacherid})
  }

  courseUpdateDeploy(courseName, desciption){
    state = 'deploy'
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid

    const course = firebase.database().ref(`/course/${courseKey}`)
    course.update({ courseName, desciption, state, teacherid})
  }
  courseDelete(){
    firebase.database().ref(`/course/${courseKey}`).remove()
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
              />
              <Text style={styles.welcome}>
                desciption
              </Text>
              <TextInput
                value = {this.state.desciption}
                onChangeText={desciption => this.setState({ desciption })}
              />
            </View>
            <Button
            title='Save'
            onPress={() => {
              this.courseUpdateUndaploy(this.state.courseName , this.state.desciption)
              this.props.navigation.goBack()
            }}
            />
            <Button
            title='Deploy'
            onPress={() => {
              this.courseUpdateDeploy(this.state.courseName, this.state.desciption)
              this.props.navigation.goBack()
            }}
            />
            <Button
            title='Close Course'
            onPress={() => {
              this.courseDelete()
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
