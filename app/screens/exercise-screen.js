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

export default class PageExerciseScreen extends Component {
  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

  constructor(props) {
    super(props)
    coursekey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    this.itemsRef = firebase.database().ref(`/course/${coursekey}/chapter/${chapterkey}/exercise`)
    this.state.dataSource = this.ds.cloneWithRows([])
  }

  state = {
    dataSource: [],
    answer: '',
    hint:''
  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {
        var items = []
        snap.forEach((child) => {
          items.push({
              title: child.val().exerName,
              _des: child.val().desciption,
              _answer: child.val().answer,
              _key: child.key
          })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }
  putAnswer(ans, exercisekey){
    coursekey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    const {currentUser} = firebase.auth()
    studentid = currentUser.uid
    firebase.database().ref(`course/${coursekey}/chapter/${chapterkey}/exercise/${exercisekey}/answerStudent`).push({studentid , ans})
  }

  componentDidMount(){
    this.listenForItems(this.itemsRef)
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
                Exercise
            </Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
        <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
                padding: 10,
              }}>
                <Text>{ data.title }</Text>
                <Text>{ data._des }</Text>
                <Text> Answer </Text>
               <TextInput
                  value={this.state.answer}
                  onChangeText={answer => this.setState({ answer })}
                />
                <Button
                  title='Send'
                  onPress={() =>{
                    this.putAnswer(this.state.answer, data._key)
                    this.state.answer = ''
                  }}
                />
                <Text> Hint </Text>
                <TextInput
                  value={this.state.hint}
                  onChangeText={hint => this.setState({ hint })}
                />
                <Button
                  title='Hint'
                  onPress={(/**key, chapterkey , exercisekey**/) => {
                    this.state.hint = data._answer
                  //  const { navigate } = this.props.navigation
                  //  navigate('PageAnswerScreen')
                  }}/>
           </View>
          )
        }} />
        </View>
          <Button
            title='Done'
            onPress={() => {
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
