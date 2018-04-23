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
  ListView,
} from 'react-native'

import {
  GoogleSignin
} from 'react-native-google-signin'

export default class Page3Screen extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
  }


  constructor(props) {
    super(props)
    this.itemsRef = firebase.database().ref(`/course/`)
    this.state.dataSource = this.ds.cloneWithRows([])
  }

/**  listenForItems(itemsRef){
    const {currentUser} = firebase.auth()
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          itemStudentRef = firebase.database().ref(`/course/${child.key}/students`)
          itemStudentRef.on('value' , (snapStudent) =>{
            snapStudent.forEach((student) =>{
              if((student.val().studentid).localeCompare(currentUser.uid) == 0){
                items.push({
                  title: child.val().courseName,
                  _des: child.val().desciption,
                  _key: child.key
                })
              }
            })
          })

        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }**/
  listenForYourItems(itemsRef){
    const {currentUser} = firebase.auth()
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          itemStudentRef = firebase.database().ref(`/course/${child.key}/students`)
          itemStudentRef.on('value' , (snapStudent) =>{
            snapStudent.forEach((student) =>{
              if((student.val().studentid).localeCompare(currentUser.uid) == 0){
                items.push({
                  title: child.val().courseName,
                  _des: child.val().desciption,
                  _key: child.key
                })
              }
            })
          })
          /**if((child.val().students).localeCompare(currentUser.uid) == 0){
            items.push({
                title: child.val().courseName,
                _des: child.val().desciption,
                _key: child.key
            })
          }**/
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }
  listenForYourItemsDeployed(itemsRef){
    const {currentUser} = firebase.auth()
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          if((child.val().state).localeCompare('deploy') == 0){

            items.push({
                title: child.val().courseName,
                _des: child.val().desciption,
                _key: child.key
            })
          }
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }


  checkStudentInCourse(coursekey){
    const {currentUser} = firebase.auth()
    items = firebase.database().ref(`/course/${coursekey}/students`)
    items.on('value', (snap) => {
        snap.forEach((child) => {
           if((child.val().studentid).localeCompare(currentUser.uid) == 0){
             return true
           }
        })
    })
    return false
  }

  studentName(){
    const {currentUser} = firebase.auth()
    items = firebase.database().ref(`/users/iduser/${currentUser.uid}`)
    var name = ''
    items.on('value', (snap) => {
      name = snap.val().name
    })
    return name
  }

  goInCourse(coursekey){
    const {currentUser} = firebase.auth()
    studentid = currentUser.uid
    name = this.studentName()
    firebase.database().ref(`/course/${coursekey}/students`).push({studentid, name})
  }

  componentDidMount() {
    // Call API then set data(s) into state
    this.listenForYourItemsDeployed(this.itemsRef)
  }

  _signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      const {navigate} = this.props.navigation
      navigate('MainScreen')
    }).catch(function(error) {
      // An error happened.

    });
  }

  SignOut(){
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
    })
    .catch((err) => {

    });
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
          <TouchableOpacity
            style={styles.appBar.colLeft.containerStyle}
            onPress={() => {

              }}>
            <Text>

            </Text>
          </TouchableOpacity>
        </View>
        {/* ItemBar */}

        <View style={styles.appBar2.containerStyle}>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
              this.listenForYourItemsDeployed(this.itemsRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
                this.listenForYourItems(this.itemsRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              Course Added
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => {
              //this.listenForItems(this.itemsRef)
            }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              Course
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
                      <Text>{ data.title }</Text>
                      <Text>{ data._des }</Text>
                      <Button
                          title='Go chapter'
                          onPress={(key) => {
                          if(this.checkStudentInCourse(data._key)){
                              const { navigate } = this.props.navigation
                              navigate('Page4Screen', {key: data._key})
                          }else{
                              const { navigate } = this.props.navigation
                              navigate('Page3Screen')
                          }
                        }}
                      />

                      <Button
                          title='Add'
                          onPress={(key) => {
                          this.goInCourse(data._key)
                          const { navigate } = this.props.navigation
                          navigate('Page4Screen', {key: data._key})
                        }}
                      />

                    </View>
                  )
                }} />

            </View>
            <Button
              title='Sign out'
              onPress={() =>{
                this._signOut()

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
