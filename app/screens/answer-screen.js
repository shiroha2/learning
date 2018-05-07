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

export default class PageAnswerScreen extends Component {


  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
  }

  constructor(props) {
    super(props)
    this.coursekey = this.props.navigation.state.params.key
    this.chapterkey = this.props.navigation.state.params.chapterkey
    this.exercisekey = this.props.navigation.state.params.exercisekey
    this.itemRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}/exercise/${this.exercisekey}/answerStudent`)
    this.state.dataSource = this.ds.cloneWithRows([])
  }
  studentName(studentid){
    items = firebase.database().ref(`/users/iduser/${studentid}`)
    var name = ''
    items.on('value', (snap) => {
      name = snap.val().name
    })
    return name
  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
            items.push({
                title: this.studentName(child.val().studentid),
                _des: child.val().ans,
                _key: child.key
            })

        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }

  componentDidMount(){
    this.listenForItems(this.itemRef)
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
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
                Answer
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

                  </View>
                )
              }} />

            </View>

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
