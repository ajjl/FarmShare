'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  AlertIOS
} from 'react-native';
import { Button, Container, Content, List, ListItem, Text, Icon, Badge,
  InputGroup,
  Input,
 } from 'native-base';
import {Actions} from 'react-native-router-flux';

import styles from './styles'

var myStyles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  navContainer: {
    flex: 1,
    paddingTop: 100
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
})

class JobDetailProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
  }
  _getJobFromID(jobID){
    console.log("in _getJobFromID");
    return fetch(`https://farmshare-api.herokuapp.com/getJob`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: jobID
      })
    })
    .then(response => {
      console.log("in first .then");
      console.log("response was: ", response);
      return response.json() }
    )
    .then(json => {
      console.log("in second .then");
      return this._jobPressed(json)
    })
  }

_enterChat() {

  console.log("aasdaa: ", this.props.match._id);
  return fetch(`https://farmshare-api.herokuapp.com/enterChat`, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chatId: this.props.match._id
    })
  })
  .then(response => response.json())
  .then(res => {
    console.log("messages: ", res.messages)
    console.log("sender: ", this.props.match.provider)
    Actions.Chat({
      sender: this.props.match.provider,
      messages: res.messages,
      match: this.props.match
    })
  })

}

_dismissMatch() {
  this.props.match.providerDecision="dismissed"
  console.log("in _dismissMatch");
  AlertIOS.alert("Your rejected the match")
  return fetch(`https://farmshare-api.herokuapp.com/matchSwipe`, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matchId: this.props.match._id,
      match: this.props.match
    })
  })
  .then(response => {
    console.log("in first .then");
    console.log("response was: ", response);
    return response.json() }
  )
  .then(json => {
    console.log("in second .then");
  })
}

_applyMatch() {
  this.props.match.providerDecision="applied"
  console.log("in _rejectMatch");
  AlertIOS.alert("Your accepted the match")
  return fetch(`https://farmshare-api.herokuapp.com/matchSwipe`, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matchId: this.props.match._id,
      match: this.props.match
    })
  })
  .then(response => {
    console.log("in first .then");
    console.log("response was: ", response);
    return response.json() }
  )
  .then(json => {
    console.log("in second .then");
  })
}

  render() {
    // console.log("props: " + JSON.stringify(this.props));
    // console.log("job " + JSON.stringify(this.props.job));
    return (
    <View style={myStyles.navContainer}>
    <Text> Job Details: </Text>
    <Container>
          <Content>
              <List>
                  <ListItem >
                      <View sytle={myStyles.rowContainer}>
                      <Text style={myStyles.title}>Name: </Text>
                      <Text >{this.props.job.name} </Text>
                      </View>
                  </ListItem>
                  <ListItem >
                      <View sytle={myStyles.rowContainer}>
                      <Text style={myStyles.title}>matchId: </Text>
                      <Text >{this.props.match._id} </Text>
                      </View>
                  </ListItem>
                  <ListItem>
                      <View sytle={myStyles.rowContainer}>
                      <Text style={myStyles.title}>Type: </Text>
                      <Text >{this.props.job.type} </Text>
                      </View>
                  </ListItem>
                  <ListItem>
                      <View sytle={myStyles.rowContainer}>
                      <Text style={myStyles.title}>Creator: </Text>
                      <Text >{this.props.job.creator}</Text>
                      </View>
                  </ListItem>
                  <ListItem>
                      <View style={myStyles.rowContainer}>
                      <Text style={myStyles.title}>Location: </Text>
                      <Text> {this.props.job.zipcode}</Text>
                      </View>
                  </ListItem>
              </List>
              <Button block success onPress={this._applyMatch.bind(this)}> Apply for Match </Button>
              <Button block danger onPress={this._dismissMatch.bind(this)}> Dismiss Match </Button>
              <Button block onPress={this._enterChat.bind(this)}> Enter Chat </Button>
          </Content>
      </Container>
    </View>
  )
  }


}


module.exports = JobDetailProvider
