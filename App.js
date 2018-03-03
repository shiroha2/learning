import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import MainScreen from './app/screens/main-screen'
import Page2Screen from './app/screens/page2-screen'

import { defaultTransitionConfig } from 'react-navigation/src/views/CardStack/TransitionConfigs'


const Navigator = StackNavigator({
  MainScreen: {
    screen: MainScreen,
  },
  Page2Screen: {
    screen: Page2Screen,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'MainScreen',
});

const DEBUG_TAG = 'App'

export default class App extends Component {
  render() {
    return <Navigator  />
  }
}
