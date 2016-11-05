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

class CreateAJob extends Component {

  _makeAPlantingJob(){
    AlertIOS.alert("trying to make planting job")
  }

  _makeAHarvestingJob(){
    AlertIOS.alert("trying to make harvest job")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> This is where we will create new jobs</Text>
        <Button style={styles.button} onPress={this._makeAPlantingJob.bind(this)}>
          <Text> Make a Planting Job</Text>
        </Button>
        <Button style={styles.button} onPress={this._makeAHarvestingJob.bind(this)}>
          <Text> MakeAHarvestingJob </Text>
        </Button>
      </View>
    )
  }

}

module.exports = CreateAJob;
