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

class CreateAJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobName: 'SomeJobName',
      zipcode: '52240'
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
        type: 'planter',
        name: this.state.JobName,
        zipcode: this.state.zipcode
      })
    }
  )
  .then((response) => {
    console.log("response: ", response);
    console.log("response.json(): ", response.json())
  })
  .catch((error) => {
    console.error("error: ", error);
  });
  }

  _makeAHarvestingJob(){
    console.log("my zip: " + this.state.zipcode)
    console.log("json req: " + JSON.stringify({
      creator: this.props.email,
      type: 'harvester',
      name: this.state.JobName,
      zipcode: this.state.zipcode
    }));
    return fetch(`https://farmshare-api.herokuapp.com/addJob/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        creator: this.props.email,
        type: 'harvester',
        name: this.state.JobName,
        zipcode: this.state.zipcode
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> This is where we will create new jobs</Text>
        <Text style={styles.welcome}> Email is: {this.props.email}</Text>
        <View style={myStyles.flowRight}>
          <Text> JobName: </Text>
          <TextInput
          style={myStyles.searchInput}
          placeholeder="Enter a Name For the Job"
          onChangeText={(text) => this.setState({JobName: text})}/>
        </View>
        <View style={myStyles.flowRight}>
          <Text> Zipcode: </Text>
          <TextInput
          style={myStyles.searchInput}
          placeholeder="Enter a location (zipcode)"
          onChangeText={(text) => this.setState({zipcode: text})}/>
        </View>
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
