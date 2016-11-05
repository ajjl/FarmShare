'use strict'


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS,
  NavigatorIOS
} from 'react-native';

import styles from './styles.js'

class JobListPageRequester extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> JobListRequester Page </Text>
      </View>
    )
  }
}

module.exports = JobListPageRequester;
