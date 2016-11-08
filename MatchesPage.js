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

import JobDetail from './JobDetail'
import styles from './styles'

var myStyles = StyleSheet.create({
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
    this.props.navigator.push({
      title: 'JobDetail',
      component: JobDetail,
      passProps: {
        job: theJob
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <Container>
      <Content>
          <List dataArray={this.props.matches}
              renderRow={(match) =>
                  <ListItem onPress={() => this._getJobFromID(match.jobId)}>

                      <Text>{match.name}</Text>
                      <Text>{match._id}</Text>
                  </ListItem>
              }>
          </List>
      </Content>
  </Container>
  </View>
    )
  }
}



/*
class MatchResults extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.jobID !== r2.jobID}
    )
    this.state = {
      isLoading: false,
      message: '',
      dataSource: dataSource.cloneWithRows(this.props.matches)
    };
  }


  renderRow(rowData, sectionID, rowID) {

    return (
      <TouchableHighlight
        onPress={()=> this.rowPressed(rowData.lister_url)}
        underlayColor='#dddddd'>
        <View>
          <View style={myStyles.rowContainer}>
            <View style={myStyles.textContainer}>
              <Text style={myStyles.title} numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={myStyles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  rowPressed(listerURL) {
    var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

    this.props.navigator.push({
      title: "JobDetail",
      component: JobDetailView,
      passProps: {jobID: jobID}
    })
  }

  render(){
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    )
  }


}
*/

module.exports = MatchResults;
