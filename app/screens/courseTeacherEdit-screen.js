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
  ListView,
  Alert,

} from 'react-native'

export default class Page6EditScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.state.password = this.listenPassword()

  }
  componentDidMount(){
  //  this.listenForItems(this.itemRef)
    console.ignoredYellowBox = [
    'Setting a timer'
    ]
  }

  listenPassword(){
    courseKey = this.props.navigation.state.params.key
    items = firebase.database().ref(`/course/${courseKey}`)
    var password = ''
    items.on('value', (snap) => {
      if(snap != null){
          password = snap.val().password
      }else {
          password = ''
      }
    })
    return password
  }


  state = {
    courseName: '',
    desciption: '',
    password: ''
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
              <Text>
                Password Course Please save
              </Text>
              <Text style={styles.welcome}>
                {this.state.password}
              </Text>
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
              Alert.alert(
                'ALERT',
                'Would you like to DEPLOY this course',
                [
                  {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                  {text: 'Ok' , onPress:() =>
                    this.courseUpdateDeploy(this.state.courseName, this.state.desciption)
                  },
                ],
                {cancalable: false}
              )
            }}
            />

        </ScrollView>
        <Button
        title='Close Course'
        color='#FF0000'
        onPress={() => {
          Alert.alert(
            'ALERT',
            'Would you like to CLOSE this course',
            [
              {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
              {text: 'Ok' , onPress:() =>
                    this.courseDelete()
              },
            ],
            {cancalable: false}
          )
          this.props.navigation.goBack()
        }}
        />
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
