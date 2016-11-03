'use strict'


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS,
  TouchableHighlight
} from 'react-native';

import styles from './styles.js';


var myStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 0
  }
});

import ProfilePage from './ProfilePage.js'
import Button from 'react-native-button'
import JobListPageRequester from './JobListPageRequester.js'
import  CreateAJob from './CreateAJob'
import MessagesPage from './MessagesPage'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SomeName'
    }

  }

  _onGoToProfileButtonPressed() {
    this.props.navigator.push({
      title: 'ProfilePage',
      component: ProfilePage
    })
  }

  _onGoToJobListingsPressed() {
    this.props.navigator.push({
      title: 'Job List Page',
      component: JobListPageRequester
    })
  }

  _onGoToCreateAJobPressed() {
    this.props.navigator.push({
      title: 'CreateRequest a new Job',
      component: CreateAJob
    })
  }

  _onGoToMessengerPressed() {
    this.props.navigator.push({
      title: 'Messenger',
      component:MessagesPage 
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Hello {this.props.name}</Text>
          <Button style={styles.button} onPress={this._onGoToProfileButtonPressed.bind(this)}>
            <Text> Go To ProfilePage </Text>
          </Button>
          <Button style={styles.button} onPress={this._onGoToJobListingsPressed.bind(this)}>
            <Text> See your Job Listings </Text>
          </Button>
          <Button style={styles.button} onPress={this._onGoToCreateAJobPressed.bind(this)}>
            <Text> Create a a New Job </Text>
          </Button>
          <Button style={styles.button} onPress={this._onGoToMessengerPressed.bind(this)}>
            <Text> GoTo Messages Page </Text>
          </Button>
      </View>
    )
  }

}

module.exports = HomePage;
