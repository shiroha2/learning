/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase'
import FilePickerManager from 'react-native-file-picker'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  IconIonic,
  ScrollView,
  Alert
} from 'react-native'


export default class Page7NewScreen extends Component {

  constructor(props) {
    super(props)
  }
  
  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  state = {
    chapterName: '',
    desciption: '',
    pathOfpdf: 'Upload PDF',
    file: ''
  }



  onPresschapterCreate(chapterName , desciption, pathOfpdf){
    courseKey = this.props.navigation.state.params.key
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const chapter = firebase.database().ref(`/course/${courseKey}/chapter`)
    chapter.push({chapterName , desciption , pathOfpdf})
  }

  _upload(filepath){
    courseKey = this.props.navigation.state.params.key
    storageRef = firebase.storage().ref(`/course/${courseKey}/chapter`)
    documentfile = storageRef.child(filepath)
    uploadtask = documentfile.put(file)
    return documentfile.fullpath
  }

 /**  onPressLearnMore(){
    FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response)
      if(response.didCancel){
        console.log('Use cancelled file picker')
      }
      else if (response.error){
        console.log('FilePickerManager Error: ', response.error)
      }
      else{
        this.setState({
          file: response
        })
      }
    })
    //Alert.alert('Button has been pressed!');
  }
  **/

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
                New Chapter
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
            {this.state.pathOfpdf}
          </Text>
          <Button
            title= 'Select File'
            onPress={() => {
              FilePickerManager.showFilePicker(null, (response) => {
                  console.log('Response = ', response)

                  if (response.didCancel) {
                    console.log('User cancelled file picker')
                  }
                  else if (response.error) {
                    console.log('FilePickerManager Error: ', response.error)
                  }
                  else {
                    this.setState({
                      pathOfpdf: response
                    })
                  }
                })
            }}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
          <View>
            {/*PDF View*/}
          </View>
          <Button
            title='Done'
            onPress={() => {
              filepath = this._upload(this.state.pathOfpdf)
              this.onPresschapterCreate(this.state.chapterName , this.state.desciption , filepath)
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
