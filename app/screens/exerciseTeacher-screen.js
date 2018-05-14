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
  ListView
} from 'react-native'

export default class PageExerciseTeacherScreen extends Component {


  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    coursekey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    this.itemsRef = firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}/exercise`)
    this.state.dataSource = this.ds.cloneWithRows([])
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
                Exersice
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

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
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
                  <Text>{ data._des}</Text>
                  <Text>{ data._answer }</Text>
                  <Button
                    title='Edit'
                    onPress={(key , chapterkey,exercisekey) => {
                    const { navigate } = this.props.navigation
                    navigate('PageExerciseTeacherEditScreen',{key: this.props.navigation.state.params.key,
                                                              chapterkey: this.props.navigation.state.params.chapterkey,
                                                              exercisekey: data._key } )
                   }}/>
                   <Button
                     title='Watch answer students'
                     onPress={(key , chapterkey,exercisekey) => {
                     const { navigate } = this.props.navigation
                     navigate('PageAnswerScreen', {key: this.props.navigation.state.params.key,
                                                               chapterkey: this.props.navigation.state.params.chapterkey,
                                                               exercisekey: data._key})
                   }}
                   />
                </View>
            )
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
