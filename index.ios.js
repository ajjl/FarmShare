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

//import styles from './styles.js';
import Button from 'react-native-button';
var ReactNative = require('react-native')

var LoginPage = require('./LoginPage')



var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'steelblue',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});


class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'FarmShare Login',
          component: LoginPage,
        }}
      />
    )
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
