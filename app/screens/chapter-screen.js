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
  Alert

} from 'react-native'

export default class Page4Screen extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
  }


  constructor(props) {
    super(props)
    this.coursekey = this.props.navigation.state.params.key
    this.itemsRef = firebase.database().ref(`/course/${this.coursekey}/chapter/`)
    this.state.dataSource = this.ds.cloneWithRows([])
  }

  studentDelete(coursekey){
    const {currentUser} = firebase.auth()
    studentid = currentUser.uid
    items = firebase.database().ref(`/course/${coursekey}/students`)
    items.on('value', (snap) => {
        snap.forEach((child) => {
           if((child.val().studentid).localeCompare(currentUser.uid) == 0){
             firebase.database().ref(`/course/${coursekey}/students/${child.key}`).remove()
             return true
           }
        })
    })
    return false

  }

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          items.push({
              title: child.val().chapterName,
              _des: child.val().desciption,
              //_path: child.val().pathOfpdf,
              _key: child.key
          })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }

  componentDidMount() {
    // Call API then set data(s) into state
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
                Chapter
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


                      <Button
                        title='Go In chapter'
                        onPress={( key , chapterkey ) => {
                        const { navigate } = this.props.navigation
                        navigate('Page5Screen', {key: this.props.navigation.state.params.key, chapterkey: data._key})
                      }} />
                      <Button
                        title='Go In exercise'
                        onPress={(key , chapterkey) => {
                        const { navigate } = this.props.navigation
                        navigate('PageExerciseScreen', {key: this.props.navigation.state.params.key, chapterkey: data._key})
                      }} />
                    </View>
                  )
                }} />

              </View>

            <Button
              title='Chat'
              onPress={(key) => {
                const { navigate } = this.props.navigation
                navigate('ChatRoom', {key: this.props.navigation.state.params.key})
              }} />


        </ScrollView>
          <Button
          title='Out from Course'
          color='#FF0000'
          onPress={() => {
            Alert.alert(
              'ALERT',
              'Would you like to out from this course',
              [
                {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                {text: 'Ok' , onPress:() =>
                      this.studentDelete(this.coursekey)
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
}
