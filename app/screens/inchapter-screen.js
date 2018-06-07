/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase'
//import Pdf from 'react-native-pdf'
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
  WebView,
  Dimensions
} from 'react-native'

import Pdf from 'react-native-pdf'

export default class Page4Screen extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
    url: ''
  }

  constructor(props) {
    super(props)
    this.coursekey = this.props.navigation.state.params.key
    this.chapterkey = this.props.navigation.state.params.chapterkey
    this.itemsRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}`)
    this.state.dataSource = this.ds.cloneWithRows([])
  }


  listenForItems(itemsRef){
    var name = ''
    var des = ''
    var path = ''
    itemsRef.on('value' ,(snap) =>{
       name = snap.val().chapterName
       des = snap.val().desciption
       path = snap.val().pathOfpdfs
    })
    this.setState({
      dataSource: this.ds.cloneWithRows([{
          title: name,
          _des: des,
          _path: path,
        }]),
      })
  }
  getPath(){
    itemsRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}`)
    var path = ''
    itemsRef.on('value', (snap) =>{
      path = snap.val().pathOfpdf
    })
    return path
  }
  getPathYoutube(){
    itemsRef = firebase.database().ref(`/course/${this.coursekey}/chapter/${this.chapterkey}`)
    var path = ''
    itemsRef.on('value', (snap) =>{
      path = snap.val().pathOfYoutube
    })
    return path
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
                Chapter
            </Text>
          </View>
        </View>

        {/* Body */}
        <WebView
          style={{flex:1}}
          javaScriptEnabled={true}
          source={{html: `<iframe width="560" height="315" src=${this.getPathYoutube()} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}}
        />
        <WebView
          source={{uri: this.getPath()}}
          style={styles.container}
         />
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
                padding: 10,
              }}>
                <Text>Chapter: { data.title }</Text>
                <Text>Desciption: { data._des}</Text>
              </View>
          )
        }} />
        </ScrollView>
        <Pdf/>
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
