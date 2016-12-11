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
import { Container, Content, List, ListItem, Text, Icon, Badge, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Actions} from 'react-native-router-flux';
import Promise from 'bluebird';

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

class JobDetail extends Component {
  constructor(props) {
    super(props);
    //this._acceptMatch(myMatch)=this._acceptMatch(myMatch).bind(this)
  }
  _personPressed(person) {
    console.log("person is: " , person);
    AlertIOS.alert("You should now go to the (matchandprofile page) see the details of "+ person+ " and be able to accept or reject their application, and start a chat")
  }



  _acceptMatch(myMatch){
      return Promise.map(this.props.matches, match => {
        if(match._id !== myMatch._id){
          return this._rejectMatch(match)
        } else {
          return this._acceptMatchHelper(match);
        }
    })
  }

    _acceptMatchHelper(myMatch){
    console.log("match is: ", myMatch);
    myMatch.creatorDecision="accepted"
    console.log("in _acceptMatch");
    AlertIOS.alert("You will accept the match")
    return fetch(`https://farmshare-api.herokuapp.com/matchSwipe`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matchId: myMatch._id,
        match: myMatch
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
  _rejectMatch(myMatch){
    myMatch.creatorDecision="rejected"
    console.log("in _rejectMatch");
    //AlertIOS.alert("you will reject the match")
    return fetch(`https://farmshare-api.herokuapp.com/matchSwipe`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        matchId: myMatch._id,
        match: myMatch
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
  _goToChat(match){
    console.log("match: ", match)
    console.log("in _goToChat");
    return fetch(`http://localhost:3000/enterChat`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatId: match._id
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log("messages: ", res.messages)
      console.log("sender: ", match.creator)
      Actions.Chat({
        sender: match.creator,
        messages: res.messages,
        match: match
      })
    })
  }

  render() {
    console.log("props: " + this.props);
    console.log("job " + JSON.stringify(this.props.job));
    const acceptedMatches = []
    for (const match of this.props.matches) {
      if (match.providerDecision === "applied" && match.creatorDecision !== "rejected") acceptedMatches.push(match)
    }
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
              <ListItem>
              <View style={myStyles.rowContainer}>
              <Text style={myStyles.title}>Your Possible providers: (only see this if provider has accpted): </Text>
              </View>
              </ListItem>
              <List dataArray={acceptedMatches}
                  renderRow={(match) =>
                      <ListItem>

                        <List>
                        <ListItem itemDivider>
                          <Text >{match.provider}</Text>
                          </ListItem>
                          <Text style={myStyles.bld}>  Distance: {match.distance/1000} km </Text>
                          <Text style={myStyles.bld}>  Your Decision: {match.creatorDecision} </Text>
                    <ListItem>
                    <Grid>
                    <Col>
                    <Button block info onPress={() => this._goToChat(match)}> Chat</Button>
                    </Col>
                    <Col>
                    <Button block success onPress={() => this._acceptMatch(match)}> Accept </Button>
                    </Col>
                    <Col>
                    <Button block danger onPress={() => this._rejectMatch(match)}> Reject </Button>
                    </Col>
                    </Grid>
                    </ListItem>
                      </List>
                      </ListItem>
                    }>
              </List>
              </List>
          </Content>
      </Container>
    </View>
  )
  }

  renderCrap(){
    return(
      <View>
        <Text></Text>
      </View>
    )
  }
  renderMatch() {
    return (
      <ListItem>
      <View style={myStyles.rowContainer}>
      <Text style={myStyles.title}>Your Matches (only see this if provider has accpted): </Text>
      </View>
      </ListItem>
    )
  }
}


module.exports = JobDetail
