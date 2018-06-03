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
  Alert
} from 'react-native'

import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'


export default class Page7EditScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.courseKey = this.props.navigation.state.params.key
    this.chapterkey = this.props.navigation.state.params.chapterkey
  }

  state = {
    chapterName: '',
    desciption: '',
    pathOfpdf: '',
    url: '',
    pathOfYoutube: '',
    urlYoutube: ''
  }

  onPresschapterUpdate(chapterName , desciption, pathOfpdf,pathOfYoutube){
    courseKey = this.props.navigation.state.params.key
    const {currentUser} = firebase.auth()
    teacherid = currentUser.uid
    const chapter = firebase.database().ref(`/course/${courseKey}/chapter`)
    chapter.update({chapterName , desciption , pathOfpdf,pathOfYoutube})
  }

  chapterDelete(){
    courseKey = this.props.navigation.state.params.key
    chapterkey = this.props.navigation.state.params.chapterkey
    firebase.database().ref(`/course/${courseKey}/chapter/${chapterkey}`).remove()
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
            Url PDF
          </Text>
          <Text>PDF: {this.state.pathOfpdf}</Text>
          <Text>Youtube: {this.state.pathOfpdf}</Text>
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
                    Alert.alert(
                      'ALERT',
                      'Would you like to EDIT this chapter',
                      [
                        {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                        {text: 'Ok' , onPress:() =>
                              this.onPresschapterUpdate(this.state.chapterName , this.state.desciption , this.state.pathOfpdf,this.state.pathOfYoutube)
                        },
                      ],
                      {cancalable: false}
                    )
            }} />

        </ScrollView>
        <Button
            title='Delete'
            color='#FF0000'
            onPress={() => {
              Alert.alert(
                'ALERT',
                'Would you like to DELETE this chapter',
                [
                  {text: 'Cancal', onPress:() => console.log('Cancel Pressed')},
                  {text: 'Ok' , onPress:() =>
                        this.chapterDelete()
                  },
                ],
                {cancalable: false}
              )
              this.props.navigation.goBack()

            }} />
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
