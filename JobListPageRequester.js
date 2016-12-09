'use strict'


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  AlertIOS,
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';
import {Actions} from 'react-native-router-flux'

import Promise from 'bluebird';

import JobDetail from './JobDetail'
import styles from './styles.js'

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





class JobListPageRequester extends Component {
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
      //console.log("response.json() was: ", response.json());
      return response.json() }
    )
    .then(json => {
      console.log("in second .then");
      console.log("json is: " + JSON.stringify(json));
      return json
      //returning the job
    })
  }

  _getMatchFromJobId(jobId) {
    console.log("in _getMatchFromJobId");
    return fetch(`https://farmshare-api.herokuapp.com/getMatchesByJob`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobId: jobId
      })
    })
    .then(response => {
      console.log("in first .then");
      console.log("response was: ", response);
      return response.json() }
    )
    .then(json => {
      console.log("in second .then");
      return json
      //returning the job
    })
  }

  _jobPressed(jobId){
    console.log("in Jobs pressed");
    console.log("jobId: " + jobId);
    return Promise.all([
      this._getJobFromID(jobId),
      this._getMatchFromJobId(jobId),
      //this._getJobFromID(jobId)
    ]).spread((theJob, matches) => {
      console.log("job from promise was: " + theJob);
      console.log("matches from promise was" + matches);
      Actions.JobDetail({
        job: theJob,
        matches: matches
      })
    })
      .catch(error => {
        console.log("got error in _jobPressed: " + error);
      })

  //  console.log("in Job pressed");

  }



  render() {
    console.log("in render JobListPageRequester.js, matches are: " + this.props.matches);
    console.log("render JLPR.js: props: " + this.props);

    return (
      <View style={myStyles.navContainer}>
      <Container>
      <Content>
      <Text style={myStyles.title}> Your Job Creations(Matches): </Text>
          <List dataArray={this.props.matches}
              renderRow={(match) =>
                  <ListItem onPress={() => this._jobPressed(match.jobId)}>

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

module.exports = JobListPageRequester;
