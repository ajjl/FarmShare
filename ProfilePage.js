'use strict'


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS
} from 'react-native';

import styles from './styles.js'
import Button from 'react-native-button'

class ProfilePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Profile Page </Text>
      </View>

    )
  }
}

module.exports = ProfilePage;
