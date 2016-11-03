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


class CreateAJob extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> This is where we will create new jobs</Text>
      </View>
    )
  }

}

module.exports = CreateAJob;
