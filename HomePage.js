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

import styles from './styles.js';

var myStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SomeName'
    }

  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Hello {this.props.name}</Text>
      </View>
    )
  }

}

module.exports = HomePage;
