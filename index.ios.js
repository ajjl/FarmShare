'use strict'
global.___DEV___ = false
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS,
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux';

//import styles from './styles.js';
import Button from 'react-native-button';
var ReactNative = require('react-native')

var LoginPage = require('./LoginPage.js')
var HomePage = require('./HomePage.js')
import ProfilePage from './ProfilePage.js'
import JobListPageRequester from './JobListPageRequester.js'
import  CreateAJob from './CreateAJob'
import MessagesPage from './MessagesPage'
import NotificationsPage from './NotificationsPage'
import MatchResults from './MatchesPage'
import Listings from './ListingsPage'
import JobDetailProvider from './JobDetailProvider'
import JobDetail from './JobDetail'





var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'steelblue',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


class AwesomeProject extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Login" component={LoginPage} title="LoginPage" initial={true} />
          <Scene key="HomePage" component={HomePage} title="Home"  />
          <Scene key="ProfilePage" component={ProfilePage} title="Profile"  />
          <Scene key="JobListPageRequester" component={JobListPageRequester} title="JobListPageRequester"  />
          <Scene key="CreateAJob" component={CreateAJob} title="CreateAJob"  />
          <Scene key="MessagesPage" component={MessagesPage} title="MessagesPage"  />
          <Scene key="NotificationsPage" component={NotificationsPage} title="NotificationsPage"  />
          <Scene key="MatchResults" component={MatchResults} title="MatchResults"  />
          <Scene key="Listings" component={Listings} title="Listings"  />
          <Scene key="JobDetailProvider" component={JobDetailProvider} title="JobDetailProvider"  />
          <Scene key="JobDetail" component={JobDetail} title="JobDetail(Creator/Requestor)"  />

        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
