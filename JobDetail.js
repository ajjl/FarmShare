'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Navigator,
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';


import styles from './styles'

var myStyles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  navContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight+50
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
  }
  render() {
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
              </List>
          </Content>
      </Container>
    </View>
  )
  }
}

module.exports = JobDetail
