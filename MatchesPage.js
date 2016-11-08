'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

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

class MatchResults extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text> Match results page not done yet</Text>
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
