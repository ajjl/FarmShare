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

class MessagesPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> The Messenger Page </Text>
        <Text style={styles.welcome}> The messenger will go here if we get that far</Text>
      </View>
    )
  }
}

module.exports = MessagesPage;
