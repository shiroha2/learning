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
  Alert
} from 'react-native'

export default class PageExerciseTeacherNewScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.coursekey = this.props.navigation.state.params.key
    this.chapterkey = this.props.navigation.state.params.chapterkey
  }
  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  state = {
    exerName: '',
    desciption: '',
    point: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    answer: ''
  }

  exerciseCreate(exerName , desciption , point, choice1 ,choice2 ,choice3 ,choice4, answer){
    chapterkey = this.props.navigation.state.params.chapterkey
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const exercise = firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}/exercise`)
    exercise.push({exerName , desciption , point,choice1 ,choice2 ,choice3 ,choice4, answer})
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
                Exersice
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
            Question
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
            Create Choice
          </Text>
          <Text styte={styles.welcome}>
            Choice1
          </Text>
          <TextInput
            value={this.state.choice1}
            onChangeText={choice1 => this.setState({choice1})}
          />
          <Text styte={styles.welcome}>
            Choice2
          </Text>
          <TextInput
            value={this.state.choice2}
            onChangeText={choice2 => this.setState({choice2})}
          />
          <Text styte={styles.welcome}>
            Choice3
          </Text>
          <TextInput
            value={this.state.choice3}
            onChangeText={choice3 => this.setState({choice3})}
          />
          <Text styte={styles.welcome}>
            Choice4
          </Text>
          <TextInput
            value={this.state.choice4}
            onChangeText={choice4 => this.setState({choice4})}
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
              this.exerciseCreate(this.state.exerName , this.state.desciption, this.state.point,this.state.choice1,this.state.choice2,this.state.choice3,this.state.choice4, this.state.answer)
              this.props.navigation.goBack()
            }} />


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
}
