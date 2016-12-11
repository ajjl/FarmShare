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

import {Actions} from 'react-native-router-flux';

import styles from './styles.js';
import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

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

import Button from 'react-native-button'


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

_getJobListings(){
  console.log("in _getJobListings");
  console.log("email is: " + this.props.email);
  return(
    fetch(`https://farmshare-api.herokuapp.com/getMatchesRequester`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.props.email
      })

    })
    .then(response => response.json())
    .then(json => {
      console.log("in second .then of _getJObListings: ", json);
      return this._handleJobResponse(json)})

    .catch( error =>{
      console.log("error in _getJobListings: ", error);

      return
      this.setState({
        isLoading: false,
        message: 'Something bad happend '
      })
    }
    )
  )
}

  _getMatches() {
    console.log("in _getMatches");
    console.log("email is: " + this.props.email);
    return(
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
        console.log("response was: ", response);
        return response.json() }
      )
      .then(json => {
        console.log("in second .then");
        return this._handleMatchResponse(json)})

      .catch( error =>{
        console.log("error in _getMatches");

        return
        this.setState({
          isLoading: false,
          message: 'Something bad happend '
        })
      }
      )
    )

  }

  _handleMatchResponse(jsonResponse) {
    console.log("in _handleMatchResponse");
    console.log(`jsonResponse was:  ${jsonResponse}`);
    console.log("matches were: " , jsonResponse);
    Actions.MatchResults({
      matches: jsonResponse
    })
  }


  _handleJobResponse(jsonResponse) {
    console.log("in _handleJobResponse");
    console.log(`jsonResponse was:  ${jsonResponse}`);
    console.log("Jobs were: " , jsonResponse);

    Actions.JobListPageRequester({
      matches: jsonResponse,
      user: this.props.user
    })
  }

//end for finding matches


  _onGetMatchesPressed(){
    console.log("Get Matches Pressed");
    this._getMatches()
  }

  _onGoToProfileButtonPressed() {
    Actions.ProfilePage({
      user: this.props.user
    })
  }

  _onGoToJobListingsPressed() {
    Actions.JobListPageRequester({
      user: this.props.user
    })
  }

  _onGoToCreateAJobPressed() {
    Actions.CreateAJob({
      email: this.props.email,
      user: this.props.user
    })
  }

  _onGoToMessengerPressed() {
    Actions.MessagesPage()
  }

  _onGoToNotificationPressed() {
    Actions.NotificationsPage()
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Hello {this.props.name} {this.props.email}</Text>

          <Button style={styles.button} onPress={this._onGoToProfileButtonPressed.bind(this)}>
            <Text> Go To ProfilePage </Text>
          </Button>
          <Button style={styles.button} onPress={this._onGoToCreateAJobPressed.bind(this)}>
            <Text> Create a a New Job </Text>
          </Button>
          <Button style={styles.button} onPress={this._getMatches.bind(this)}>
            <Text> GoTo Matches Page (See jobs u could b provider for)</Text>
          </Button>
          <Button style={styles.button} onPress={this._getJobListings.bind(this)}>
            <Text> GoTo Your Listings Page (See Jobs u have requested)</Text>
          </Button>
      </View>
    )
  }

}

module.exports = HomePage;
