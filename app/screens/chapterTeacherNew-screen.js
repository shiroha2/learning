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
  TextInput,
  TouchableOpacity,
  IconIonic,
  ScrollView,
  WebView,
  Alert
} from 'react-native'

import PropTypes from 'prop-types'

//import PDFView from 'react-native-pdf-view'

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

export default class Page7NewScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }

  state = {
    chapterName: '',
    desciption: '',
    pathOfpdf: '',
    url: '',
    pathOfYoutube: '',
    urlYoutube: ''
  }

  _upload(url){
    courseKey = this.props.navigation.state.params.key
    storage = firebase.storage()
    sessionId = new Date().getTime()
    imageRef = storage.ref('pdf').child(`${courseKey}/${sessionId}`)
  }


  onPresschapterCreate(chapterName , desciption, pathOfpdf, pathOfYoutube){
    courseKey = this.props.navigation.state.params.key
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const chapter = firebase.database().ref(`/course/${courseKey}/chapter`)
    chapter.push({chapterName , desciption , pathOfpdf, pathOfYoutube})
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
          <Text style={styles.welcome}>
            Chapter
          </Text>
          <TextInput
            value={this.state.chapterName}
            onChangeText={chapterName => this.setState({ chapterName })}
          />
          <Text style={styles.welcome}>
            Desciption
          </Text>
          <TextInput
            value={this.state.desciption}
            onChangeText={desciption => this.setState({ desciption })}
          />
          <Text style={styles.welcome}>
            Url from Youtube
          </Text>
          <TextInput
            value={this.state.pathOfYoutube}
            onChangeText={pathOfYoutube => this.setState({pathOfYoutube})}
          />

          <Text style={styles.welcome}>
            Url PDF from Google driver
          </Text>
          <TextInput
            value={this.state.pathOfpdf}
            onChangeText={pathOfpdf => this.setState({ pathOfpdf })}
          />
          <Text style={styles.welcome}>
            Url PDF and Youtube
          </Text>
          <Text>PDF: {this.state.pathOfpdf}</Text>
          <Text>Youtube: {this.state.pathOfYoutube}</Text>
          <Button
            title='Select'
            onPress={() =>{
              DocumentPicker.show({
                filetype: [DocumentPickerUtil.pdf()],
              },(error,res) => {
                // Android
                this.state.pathOfpdf = res.uri
                console.log(
                  res.uri,
                  res.type, // mime type
                  res.fileName,
                  res.fileSize
                );
              });
            }}
          />

          <Button
            title='Done'
            onPress={() => {
              this.onPresschapterCreate(this.state.chapterName , this.state.desciption , this.state.pathOfpdf, this.state.pathOfYoutube)
              this._upload(this.state.pathOfpdf)
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
  pdf: {
        flex:1
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
