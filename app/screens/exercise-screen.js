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
  Alert
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
    point: 0,
    getPoint: '',
    count: 0,
    yetAns: true
  }
  checkAlreadyAns(exerkey){
    coursekey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    const {currentUser} = firebase.auth()
    ansStudent = firebase.database().ref(`course/${coursekey}/chapter/${chapterkey}/exercise/${exerkey}/answerStudent`)
    ansStudent.on('value', (snap) => {
      snap.forEach((child) => {
        if((currentUser.uid).localeCompare(child.val().studentid) == 0){
          this.state.yetAns = false
        }else{
          this.state.yetAns = true
        }
      })
    })
  }

  countExer(){
    itemsRef = firebase.database().ref(`/course/${coursekey}/chapter/${chapterkey}/exercise`)
    var count = 0
    itemsRef.on('value', (snap) => {
      snap.forEach((child) => {
        count++
      })
    })
    return count
  }


  checkAnswer(ans, exerkey){
    const {currentUser} = firebase.auth()
    ansRef = firebase.database().ref(`/course/${coursekey}/chapter/${chapterkey}/exercise/${exerkey}`)
    scroeRef = firebase.database().ref(`users/iduser/${currentUser.uid}`)
    var name = ''
    var iduser = ''
    var email = ''
    var status = ''
    var point = ''
    scroeRef.on('value', (snap) =>{
       name = snap.val().name
       iduser = snap.val().iduser
       email = snap.val().email
       status = snap.val().status
    })
    var ansExe = ''
    var pointEx = ''
    var key = ''
    ansRef.on('value', (snap) => {
      ansExe = snap.val().answer
      pointEx = snap.val().point
    })
    if(ansExe.localeCompare(ans) == 0){
      this.state.point  = this.state.point + 1
      this.state.getPoint = pointEx
      point = this.state.point
      scroeRef.update({iduser, name, email,status, point})
      courseRef = firebase.database().ref(`/course/${coursekey}/chapter/${chapterkey}/studentpoint/${iduser}`)
      courseRef.update({iduser,name ,point})
    }
  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {
        var items = []
        snap.forEach((child) => {
          items.push({
              title: child.val().exerName,
              _des: child.val().desciption,
              _choice1: child.val().choice1,
              _choice2: child.val().choice2,
              _choice3: child.val().choice3,
              _choice4: child.val().choice4,
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
    var timestamp = new Date()
    var datetime = ''+timestamp
    const {currentUser} = firebase.auth()
    console.log(this.checkAlreadyAns(exercisekey))
    var countExe = this.countExer()
    if(this.state.count != countExe){
      this.checkAnswer(ans, exercisekey)
      savePoint = this.state.getPoint
      studentid = currentUser.uid
      firebase.database().ref(`course/${coursekey}/chapter/${chapterkey}/exercise/${exercisekey}/answerStudent`).push({studentid , ans, savePoint, datetime, exercisekey})
      this.state.count++

      }
  }

  componentDidMount(){
    this.listenForItems(this.itemsRef)
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
                <Text style={{fontSize: 20}}>{ data.title }</Text>
                <Text style={{fontSize: 18}}>{ data._des }</Text>
                <Text style={styles.choiceText}>1:{ data._choice1 }</Text>
                <Text style={styles.choiceText}>2:{ data._choice2 }</Text>
                <Text style={styles.choiceText}>3:{ data._choice3 }</Text>
                <Text style={styles.choiceText}>4:{ data._choice4 }</Text>
                <Text style={{fontSize: 18}}> Select Choice (Please insert number)</Text>
               <TextInput
                  value={this.state.answer}
                  onChangeText={answer => this.setState({ answer })}
                />
                <Text style={{fontSize: 18}}>You get {this.state.point} point</Text>
                <Button
                  title='Send'
                  onPress={() =>{
                    Alert.alert(
                      'ALERT',
                      'Confirm your answer',
                      [
                        {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                        {text: 'Ok' , onPress:() => console.log('Send Answer')},
                      ],
                      {cancalable: false}
                    )
                    this.putAnswer(this.state.answer, data._key)
                    this.state.answer = ''
                  }}
                />

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
  choiceText:{
    fontSize: 15,
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
