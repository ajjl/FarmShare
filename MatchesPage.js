'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';
import {Actions} from 'react-native-router-flux';

import styles from './styles'

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
class MatchResults extends Component {
  constructor(props) {
    super(props);
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

  _jobPressed(theJob){
    console.log("in Job pressed");
    Actions.JobDetailProvider({
      job: theJob,
      isCreator: false
    })
  }

  render() {
    return (
      <View style={myStyles.navContainer}>
      <Container>
      <Content>
      <Text style={myStyles.title}> Your Job Matches: </Text>
          <List dataArray={this.props.matches}
              renderRow={(match) =>
                  <ListItem onPress={() => this._getJobFromID(match.jobId)}>

                      <Text>{match.jobName}</Text>
                      <Text style={myStyles.bld}>  Creator: {match.creator} </Text>
                      <Text style={myStyles.bld}>  Distance: {match.distance/1000} km </Text>
                {/*      <Text>{match._id}</Text> */}
                  </ListItem>
              }>
          </List>
      </Content>
  </Container>
  </View>
    )
  }
}

module.exports = MatchResults;
