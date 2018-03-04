/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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

export default class Page2Screen extends Component {


  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  state = {
    dataSource: [],
  }

  constructor(props) {
    super(props)

    this.state.dataSource = this.ds.cloneWithRows([])
  }
  componentDidMount() {
    // Call API then set data(s) into state
    this.setState({
      dataSource: this.ds.cloneWithRows([{
        title: 'Title name 1',
      },{
        title: 'Title name 1',
      }]),
    })
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
              navigate('Page6NewScreen')
              }}>
            <Text>
              New
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
              Your Course
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.appBar2.colLeft.containerStyle}
            onPress={() => { }}>
            <Text style={styles.appBar.colRight.titleTextStyle}
              numberOfLines={1}>
              Course Deployed
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
                          title='Chapter'
                          onPress={() => {
                          const { navigate } = this.props.navigation
                          navigate('Page7Screen')
                        }} 
                      />
                      <Button
                          title='Edit'
                          onPress={() => {
                          const { navigate } = this.props.navigation
                          navigate('Page6EditScreen')
                        }} 
                      />
                       <Button
                          title='Chat'
                          onPress={() => {
                          const { navigate } = this.props.navigation
                          navigate('ChatRoom')
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
