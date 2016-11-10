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
  _makeRequest(type) {
    console.log("log in pressed")
    const email = this.state.email.toLowerCase() // <-- this should be chanded to server side logic
    const password = this.state.password
    return fetch(`https://farmshare-api.herokuapp.com/${type}`, {
    	method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    	body: JSON.stringify({
        email: email,
        password: password
    	})
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
         console.log("responseJson: ", responseJson)
        if (responseJson && Object.keys(responseJson).length) {
          this.props.navigator.push({
            title: 'HomePage',
            component: HomePage,
            passProps: {
              user: responseJson,
              name: responseJson.fullname,
              email: responseJson.email
            },

          })
        } else {
          AlertIOS.alert("Account Not Found")
        }
        // AlertIOS.alert(JSON.stringify(responseJson))

      })
      .catch((error) => {
        console.error(error);
      });

  }

  _loginButton() {
    this._makeRequest("login")

  }

  _registerButton() {
        this._makeRequest("signup");
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
        <TextInput
          secureTextEntry={true}
          style={styles.login}
          placeholder="password"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
        />
        <Button
          style={styles.button}
          onPress={() => this._loginButton()}>
          Login
        </Button>
        <Button
          style={styles.button}
          onPress={() => this._registerButton()}>
          Register
        </Button>
      </View>
    );
  }
}



module.exports = LoginPage
