import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import MainScreen from './app/screens/main-screen'
import Page2Screen from './app/screens/profile-screen'
import Page3Screen from './app/screens/course-screen'
import Page4Screen from './app/screens/chapter-screen'
import Page5Screen from './app/screens/inchapter-screen'
import PageExerciseScreen from './app/screens/exercise-screen'
import PageAnswerScreen from './app/screens/answer-screen'
import ChatRoom from './app/screens/chatroom-screen'
import Page6Screen from './app/screens/courseTeacher-screen'
import Page6NewScreen from './app/screens/courseTeacherNew-screen'
import Page6EditScreen from './app/screens/courseTeacherEdit-screen'
import Page7Screen from './app/screens/chapterTeacher-screen'
import Page7NewScreen from './app/screens/chapterTeacherNew-screen'
import Page7EditScreen from './app/screens/chapterTeacherEdit-screen'
import PageExerciseTeacherScreen from './app/screens/exerciseTeacher-screen'
import PageExerciseTeacherEditScreen from './app/screens/exerciseTeacherEdit-screen'
import PageExerciseTeacherNewScreen from './app/screens/exerciseTeacherNew-screen'
import PageStudentCourseScreen from './app/screens/courseStudentTeacher-screen'
import PageRegisterScreen from './app/screens/register-screen'
import PageCoursePassword from './app/screens/coursePassword-screen'
import PageScoreScreen from './app/screens/score-screen'

import LoginForm from './app/auth/loginForm'
import firebase from 'firebase'
//import OneSignal from 'react-native-onesignal'

import { defaultTransitionConfig } from 'react-navigation/src/views/CardStack/TransitionConfigs'


const Navigator = StackNavigator({
  MainScreen: {
    screen: MainScreen,
  },
  Page2Screen: {
    screen: Page2Screen,
  },
  Page3Screen: {
    screen: Page3Screen,
  },
  Page4Screen: {
    screen: Page4Screen,
  },
  Page5Screen: {
    screen: Page5Screen,
  },
  PageAnswerScreen: {
    screen: PageAnswerScreen
  },
  ChatRoom: {
    screen: ChatRoom,
  },
  Page6Screen: {
    screen: Page6Screen,
  },
  Page6EditScreen: {
    screen: Page6EditScreen,
  },
  Page6NewScreen: {
    screen: Page6NewScreen,
  },
  Page7Screen: {
    screen: Page7Screen,
  },
  Page7NewScreen: {
    screen: Page7NewScreen,
  },
  Page7EditScreen: {
    screen: Page7EditScreen,
  },
  PageExerciseScreen: {
    screen: PageExerciseScreen,
  },
  PageExerciseTeacherScreen: {
    screen: PageExerciseTeacherScreen,
  },
  PageExerciseTeacherEditScreen: {
    screen: PageExerciseTeacherEditScreen,
  },
  PageExerciseTeacherNewScreen: {
    screen: PageExerciseTeacherNewScreen,
  },
  PageStudentCourseScreen: {
    screen: PageStudentCourseScreen
  },
  PageRegisterScreen: {
    screen: PageRegisterScreen
  },
  PageCoursePassword: {
    screen: PageCoursePassword
  },
  PageScoreScreen: {
    screen: PageScoreScreen
  },
}, {
  headerMode: 'none',
  initialRouteName: 'MainScreen',
});

const DEBUG_TAG = 'App'


export default class App extends Component {

  componentDidMount(){
    console.ignoredYellowBox = [
    'Setting a timer'
    ]
  }

/**  componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    onIds(device) {
		    console.log('Device info: ', device);
    }
**/
  render() {
    return <Navigator  />
  }
}
