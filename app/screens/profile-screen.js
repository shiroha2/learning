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
  Picker
} from 'react-native'

import {
  userUpdate,
  userCreate
} from '../actions/userAction'

export default class Page2Screen extends Component {

  constructor(props) {
    super(props)
  }
  
  onButtonPress() {
    const {name, email, status } = this.props
    this.props.userCreate({name , email, status})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile
        </Text>
        <TextInput
          value = {this.props.name}
          onChangeText={text=>this.props.userUpdate({prop: 'name', value: text})}
        />
        <TextInput
          value = {this.props.email}
          onChangeText={text=>this.props.userUpdate({prop: 'email', value: text})}
        />
        <Text style={styles.pickerTextStyle}>Status</Text>
        <Picker
          style={{ flex: 1 }}
          selectedValue={this.props.status}
          onValueChange={status => this.props.userUpdate({ prop: 'status', value: status })}
        >
          <Picker.Item label="Student" value="student"/>
          <Picker.Item label="Teacher" value="teacher"/>
        </Picker>


        <Button
          title='Student'
          onPress={() => {
            this.onButtonPress.bind(this)
            const { navigate } = this.props.navigation
            navigate('Page3Screen')
          }} 
        />

        <Button
          title='Teacher'
          onPress={() => {
            this.onButtonPress.bind(this)
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
