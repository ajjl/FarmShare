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
  constructor(props) {
    super(props);
    this.state = {
      name: 'SomeName'
    }

  }

  _makeAPlantingJob(){
    return fetch(`https://farmshare-api.herokuapp.com/addJob/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creator: this.props.email,
        type: 'Planter'
      })
    }
  )
  .then((response) => {
    console.log("response: ", response);
    return response.json()
  })
  .catch((error) => {
    console.error(error);
  });
  }

  _makeAHarvestingJob(){
    AlertIOS.alert("trying to make harvest job")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> This is where we will create new jobs</Text>
        <Text style={styles.welcome}> Email is: {this.props.email}</Text>
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
