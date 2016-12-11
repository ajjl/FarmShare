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

  _dismissMatch(myMatch) {
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

  _enterChat(myMatch) {

    console.log("myMatch: ", myMatch);
    console.log("myMatch._id: ", myMatch._id);
    return fetch(`http://localhost:3000/enterChat`, {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatId: myMatch._id
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log("messages: ", res.messages)
      console.log("sender: ", myMatch.provider)
      Actions.Chat({
        sender: myMatch.provider,
        messages: res.messages,
        match: myMatch
      })
    })

  }


  _acceptMatch(myMatch){
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
    AlertIOS.alert("you will reject the match")
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
  _goToChat(){
    console.log("in _goToChat");
    AlertIOS.alert("go to your chat")
  }

  render() {
    console.log("props: " + this.props);
    console.log("job " + JSON.stringify(this.props.job));
    console.log("this.props.matches: ", this.props.matches);
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
              <List dataArray={this.props.matches}
                  renderRow={(match)=>this.myRenderRow({match})

                    }>
              </List>
              </List>
          </Content>
      </Container>
    </View>
  )
  }
  myRenderRow(match){
    return(
      <ListItem>

        <List>
        <ListItem itemDivider>
          <Text >{match.provider}</Text>
          </ListItem>
          <Text style={myStyles.bld}>  Distance: {match.distance/1000} km </Text>
    <ListItem>
    <Grid>
    <Col>
    <Button block info onPress={(match)=>{this._enterChat(match)}}> Chat</Button>
    </Col>
    <Col>
    <Button block success onPress={this._goToChat.bind(this)}> Accept </Button>
    </Col>
    <Col>
    <Button block danger onPress={this._goToChat.bind(this)}> Reject </Button>
    </Col>
    </Grid>
    </ListItem>
      </List>
      </ListItem>
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
