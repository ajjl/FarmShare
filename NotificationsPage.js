'use strict'



import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS,
  TouchableHighlight
} from 'react-native';

import styles from './styles.js';
import Button from 'react-native-button'

var myStyles = StyleSheet.create({
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 8,
    color: '#48bbec'
  }
})

class NotificationsPage extends Component {
  render (){
    return (
      <View style={styles.container}>
        <Text> NotificationsPage </Text>
      </View>
    )
  }
}

module.exports = NotificationsPage;
