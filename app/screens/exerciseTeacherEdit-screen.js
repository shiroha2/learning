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
} from 'react-native'

export default class PageExerciseTeacherEditScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.coursekey = this.props.navigation.state.params.key
    this.chapterkey = this.props.navigation.state.params.chapterkey
  }

  state = {
    exerName: '',
    desciption: '',
    point: '',
    answer: ''
  }

  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  exerciseUpdate(exerName , desciption , point, answer){
    chapterkey = this.props.navigation.state.params.chapterkey
    exercisekey = this.props.navigation.state.params.exercisekey
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const exercise = firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}/exercise/${exercisekey}`)
    exercise.update({exerName , desciption , point, answer})
  }

  exerciseDelete(){
    chapterkey = this.props.navigation.state.params.chapterkey
    exercisekey = this.props.navigation.state.params.exercisekey
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const exercise = firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}/exercise/${exercisekey}`)
    exercise.remove()
  }

  render() {
    return (
      <View style={styles.container}>
        {/* AppBar */}
        <View style={styles.appBar.containerStyle}>
          <TouchableOpacity
            style={styles.appBar.colLeft.containerStyle}
            onPress={() => {
              this.props.navigation.goBack()
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
                Exercise Edit
            </Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
         <Text styte={styles.welcome}>
            Exercise
          </Text>
          <TextInput
            value={this.state.exerName}
            onChangeText={exerName => this.setState({exerName}) }
          />
          <Text styte={styles.welcome}>
            Desciption
          </Text>
          <TextInput
            value={this.state.desciption}
            onChangeText={desciption => this.setState({desciption})}
          />
          <Text styte={styles.welcome}>
            point
          </Text>
          <TextInput
            value={this.state.point}
            onChangeText={point => this.setState({point})}
          />
          <Text styte={styles.welcome}>
            Answer
          </Text>
          <TextInput
            value={this.state.answer}
            onChangeText={answer => this.setState({answer})}
          />
          <Button
            title='Done'
            onPress={() => {
              this.exerciseUpdate(this.state.exerName, this.state.desciption, this.state.point, this.state.answer)
              this.props.navigation.goBack()
            }} />



        </ScrollView>
        <Button
          title='Delete'
          color='#FF0000'
          onPress={() => {
            this.exerciseDelete()
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
}
