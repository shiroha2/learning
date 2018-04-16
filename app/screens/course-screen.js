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

  listenForItems(itemsRef){
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          items.push({
              title: child.val().courseName,
              _key: child.key
          })
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }
  listenForYourItems(itemsRef){
    const {currentUser} = firebase.auth()
    itemsRef.on('value', (snap) => {

        var items = []
        snap.forEach((child) => {
          if(child.val().studentid == currentUser.uid){
            items.push({
                title: child.val().courseName,
                _key: child.key
            })
          }
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
          if((child.val().studentid == currentUser.uid) && (child.val().status == "deploy")){
            items.push({
                title: child.val().courseName,
                _key: child.key
            })
          }
        })
        this.setState({
          dataSource: this.ds.cloneWithRows(items)
        })
    })
  }

  goInCourse(chapterkey){
    const {currentUser} = firebase.auth()
    studentid = currentUser.uid
    firebase.database().ref(`/course/${chapterkey}/student/`).push(studentid)
  }

  componentDidMount() {
    // Call API then set data(s) into state
    this.listenForItems(this.itemsRef)
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
            <Text>
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
              const { navigate } = this.props.navigation
              navigate('Page4Screen')
              }}>
            <Text>
              +
            </Text>
          </TouchableOpacity>
        </View>
        {/* ItemBar */}

        <View style={styles.appBar2.containerStyle}>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => { }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => { }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              Course Added
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => { }}>
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
                      <Button
                          title='Go chapter'
                          onPress={() => {
                          const { navigate } = this.props.navigation
                          navigate('Page4Screen')
                        }}
                      />
                      <Button
                          title='Add'
                          onPress={() => {
                          this.goInCourse(data._key)
                          const { navigate } = this.props.navigation
                          navigate('Page4Screen')
                        }}
                      />
                    </View>
                  )
                }} />

            </View>

            <Button
            title='Back to Main screen'
            onPress={() => {
              this.props.navigation.goBack()
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
