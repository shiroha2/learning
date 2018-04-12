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

export default class Page7EditScreen extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    chapterName: '',
    desciption: '',
    pathOfpdf: ''
  }

  onPresschapterUpdate(chapterName , desciption, pathOfpdf){
    courseKey = this.props.navigation.state.params.key
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const chapter = firebase.database().ref(`/course/${courseKey}/chapter`)
    chapter.update({chapterName , desciption , pathOfpdf})
  }

  chapterDelete(){
    courseKey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}`).remove()
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
            <Text>
              Back
            </Text>
          </TouchableOpacity>
          <View
            style={styles.appBar.colRight.containerStyle}>
            <Text
              style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
                Edit Chapter
            </Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{
          flex: 1,
        }}>
          <Text styte={styles.welcome}>
            Chapter
          </Text>
          <TextInput
            value={this.state.chapterName}
            onChangeText={chapterName => this.setState({ chapterName })}
          />
          <Text styte={styles.welcome}>
            Desciption
          </Text>
          <TextInput
            value={this.state.desciption}
            onChangeText={desciption => this.setState({ desciption })}
          />
          <Text styte={styles.welcome}>
            Upload PDF
          </Text>
          <TextInput
            value={this.state.pathOfpdf}
            onChangeText={pathOfpdf => this.setState({ pathOfpdf })}
          />
          <Button
            title='Done'
            onPress={() => {
              this.onPresschapterUpdate(this.state.chapterName , this.state.desciption , this.state.pathOfpdf)
              this.props.navigation.goBack()
            }} />
          <Button
            title='Back to Main screen'
            onPress={() => {
              this.props.navigation.goBack()
            }} />
          <Button
              title='Detele'
              onPress={() => {
                this.chapterDelete()
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
