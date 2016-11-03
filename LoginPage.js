'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  AlertIOS
} from 'react-native'

import Button from 'react-native-button'

import styles from './styles.js';
import HomePage from './HomePage.js'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
_handlePressAlex(){
  AlertIOS.alert("You pressed Alex button")
}
  _handlePress() {
    console.log("log in pressed")
    const email = this.state.email
        this.props.navigator.push({
          title: 'HomePage',
          component: HomePage,
          passProps: {name: email},
        })
        /*
    return fetch(`https://farmshare-api.herokuapp.com/login?email=${email}&password=123456`)
      .then((response) => response.json())
      .then((responseJson) => {
        AlertIOS.alert(JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.error(error);
      });*/

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Insert Farm Share Logo Here*
        </Text>
        <TextInput
          style={styles.login}
          placeholder="email"
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />
        <Button
          style={styles.button}
          onPress={() => this._handlePress()}>
          Sign In
        </Button>
      </View>
    );
  }
}



module.exports = LoginPage
