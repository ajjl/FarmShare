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
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('9bc209b52aec5eb5117c', {
  encrypted: true
});


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
import NotificationsPage from './NotificationsPage'
import MatchResults from './MatchesPage'




class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: 'SomeName',
      email: 'email',
      message: ''
    }

    console.log("props.email: ", props.email)
    const channel = pusher.subscribe(props.email);
    channel.bind('foundJob', data => {
      console.log("data: ", data)
    });
  }

//for finding matches

  _getMatches() {
    console.log("in _getMatches");
    console.log("email is: " + this.props.email);
    return
      fetch(`https://farmshare-api.herokuapp.com/getMatches`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': this.props.email
        })

      })
      .then(response => {
        console.log("in first .then");
        console.log("response was: " + response);
        response.json() }
      )
      .then(json => {
        console.log("in second .then");
        return
        this._handleMatchResponse(json.response)})

      .catch( error =>{
        console.log("error in _getMatches");

        return
        this.setState({
          isLoading: false,
          message: 'Something bad happend '
        })
      }
      )

  }

  _handleMatchResponse(jsonResponse) {
    console.log("jsonResponse was: " + jsonResponse);
    console.log("matches were: " + jsonResponse);
    this.props.navigator.push({
      title: 'Matches',
      component: MatchResults,
      passProps: {
        matches: jsonResponse
      }
    })
  }

//end for finding matches


  _onGetMatchesPressed(){
    console.log("Get Matches Pressed");
    this._getMatches()
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
      component: CreateAJob,
      passProps: {
        email: this.props.email
      },
    })
  }

  _onGoToMessengerPressed() {
    this.props.navigator.push({
      title: 'Messenger',
      component:MessagesPage
    })
  }

  _onGoToNotificationPressed() {
    this.props.navigator.push({
      title: 'Notifications',
      component: NotificationsPage
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Hello {this.props.name} {this.props.email}</Text>

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
          <Button style={styles.button} onPress={this._onGoToNotificationPressed.bind(this)}>
            <Text> GoTo Notifications Page </Text>
          </Button>
          <Button style={styles.button} onPress={this._getMatches.bind(this)}>
            <Text> GoTo Matches Page </Text>
          </Button>
      </View>
    )
  }

}

module.exports = HomePage;
