'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  AlertIOS,
  StyleSheet,
} from 'react-native';

import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';

import JobDetail from './JobDetail'
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
  }
})

class UserProviderInfoPage extends Component {
  render(){
    return (
      <View style={myStyles.navContainer}>
        <Text sytle={styles.welcome}> Provider Info Page </Text>
      </View>
    )
  }
}

module.exports=UserProviderInfoPage
