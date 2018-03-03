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
  TextInput,
} from 'react-native'

export default class Page2Screen extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
        <TextInput
          
        />
        <TextInput
          
        />
        <Button
          title='Student'
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Page3Screen')
          }} 
        />
        <Button
          title='Teacher'
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Page6Screen')
          }}
        />
          <Button
          title='Back to Main screen'
          onPress={() => {
            this.props.navigation.goBack()
          }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})
