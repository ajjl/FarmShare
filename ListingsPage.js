'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';

import JobDetail from './JobDetail'
import styles from './styles'

var myStyles = StyleSheet.create({
  navContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight+50
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
  }
})

//Should job detail have provider???
class Listings extends Component {
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

  render() {
    return (
      <View style={myStyles.navContainer}>
      <Container>
      <Content>
      <Text style={myStyles.title}> Your Job ListingPage: </Text>
          <List dataArray={this.props.jobs}
              renderRow={(job) =>
                <ListItem>
                      <Text>{job.name}</Text>
                  </ListItem>
              }>
          </List>
      </Content>
  </Container>
  </View>
    )
  }
}



module.exports = Listings;
