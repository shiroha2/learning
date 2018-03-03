import React, { Component } from 'react'
import {
  Platform,
  Text,
  View,
  Button,
} from 'react-native'

export default class MainScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('DEBUG_TAG', 'This message will appear on Android Studio')
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text style={{
          fontSize: 20,
          textAlign: 'center',
          margin: 10,
        }}>
          Welcome to Page 1
        </Text>
        <Button
          title='Go to page 2'
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Page2Screen')
          }} />
      </View>
    )
  }
}
