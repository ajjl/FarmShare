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


var myStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 0
  }
});

import ProfilePage from './ProfilePage.js'
import Button from 'react-native-button'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'SomeName'
    }

  }

  _onGoToProfileButtonPressed() {
    this.props.navigator.push({
      title: 'ProfilePage',
      component: ProfilePage
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Hello {this.props.name}</Text>
          <Button style={styles.button} onPress={this._onGoToProfileButtonPressed.bind(this)}>
            <Text> Go To ProfilePage </Text>
          </Button>
      </View>
    )
  }

}

module.exports = HomePage;
