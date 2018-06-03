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

  filterByWrongChoice(itemsRef){
    ansExer = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}/exercise/${this.exercisekey}`)
    ansE = ''
    ansExer.on('value', (snap) =>{
      ansE = snap.val().answer
    })
    itemsRef.on('value', (snap) => {
        var items = []
        snap.forEach((child) => {
          if((child.val().ans).localeCompare(ansE) != 0)
            items.push({
                title: this.studentName(child.val().studentid),
                _des: child.val().ans,
                _date: child.val().datetime,
                _point: child.val().point,
                _key: child.key
            })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }
  //PersonRightChoice
  filterByRightChoice(itemsRef){
    ansExer = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}/exercise/${this.exercisekey}`)
    ansE = ''
    ansExer.on('value', (snap) =>{
      ansE = snap.val().answer
    })
    itemsRef.on('value', (snap) => {
        var items = []
        snap.forEach((child) => {
          if((child.val().ans).localeCompare(ansE) == 0)
            items.push({
                title: this.studentName(child.val().studentid),
                _des: child.val().ans,
                _date: child.val().datetime,
                _point: child.val().point,
                _key: child.key
            })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }

  getScroeStudent(){
    getScroeRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}/exercise`)
    var point = 0
    getScroeRef.on('value' , (snap) => {
      var exerkey = ''
      snap.forEach((child) => {
        exerkey = child.key
        getScroeAnsRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}/exercise/${exerkey}`)
        getScroeAnsRef.on('value' , (snap2) => {
          snap2.forEach((child2) => {
            if(child2.val().savePoint != null){

            }
          })
        })
      })
    })
  }

  listenForItems(itemsRef){
    var point = 0
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          point = point + parseInt(snap.val().savePoint)
            items.push({
                title: this.studentName(child.val().studentid),
                _des: child.val().ans,
                _date: child.val().datetime,
                _point: point,
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

        {/* ItemBar */}

        <View style={styles.appBar2.containerStyle}>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
              this.filterByRightChoice(this.itemRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              RightFilter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
              this.filterByWrongChoice(this.itemRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              WrongFilter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
              this.listenForItems(this.itemRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              All
            </Text>
          </TouchableOpacity>
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
                    <Text>Name: { data.title }</Text>
                    <Text>Answer: { data._des }</Text>
                    <Text>Date answer:{ data._date }</Text>


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
