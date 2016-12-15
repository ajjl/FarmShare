'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';
import { Button, Container, Content, List, ListItem, Text, Icon, Badge, InputGroup, Input } from 'native-base';
import {Actions} from 'react-native-router-flux';

import styles from './styles'


import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

const pusher = new Pusher('9bc209b52aec5eb5117c', {
  encrypted: true
});

var myStyles = StyleSheet.create({
  navContainer: {
    flex: 1,
    paddingTop: 100
  },
  textContainer: {
    flex: 1
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
  },
  bld: {
    fontWeight: '500'
  }
})

//Should job detail have provider???
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      newMessages: []
    }

    console.log("props.match._id: ", props.match._id)
    const channel = pusher.subscribe(props.match._id);
    channel.bind('message', message => {
      console.log("message: ", message)
      this.state.newMessages.push(message)
      console.log("this.state.newMessages: ", this.state.newMessages)
      this.forceUpdate()
    });
  }

  sendMessage() {
    console.log("sending!")
    console.log("this.props.sender: ", this.props.sender)
    console.log("this.props.match: ", this.props.match)
    console.log("this.state.message: ", this.state.message)

    return fetch(`https://farmshare-api.herokuapp.com/sendMessage`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senderId: this.props.sender,
        chatId: this.props.match._id,
        message: this.state.message
      })
    })
    .then(response => response.json())
    .then(res => {
      this.setState({
        message: ""
      })
      console.log("res: ", res)
    })
  }

  render() {
    console.log("this.props.messages: ", this.props.messages)
    return (
      <View style={myStyles.navContainer}>
      <Container>
      <Content>
      <Text style={myStyles.title}> Your Job Matches: </Text>
          <List dataArray={this.props.messages}
              renderRow={(message) =>
                  <ListItem>
                      <Text style={myStyles.bld}> {message.timeIos} {"\n"} Sender: {message.senderId}  {"\n"} Contents: {message.content} </Text>
                  </ListItem>
              }>
          </List>
          <List dataArray={this.state.newMessages}
              renderRow={(message) =>
                  <ListItem>
                      <Text style={myStyles.bld}> {message.timeIos} {"\n"} Sender: {message.senderId}  {"\n"} Contents: {message.content} </Text>
                  </ListItem>
              }>
          </List>

          <InputGroup borderType='underline' >
                    <Input placeholder='Send a message here'
                    onChangeText={(message) => this.setState({message: message})}
                    value={this.state.message}
                     />
          </InputGroup>
          <Button onPress={() => this.sendMessage()}>Send</Button>

      </Content>
  </Container>
  </View>
    )
  }
}

module.exports = Chat;
