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
import Button from 'react-native-button';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  _handlePress() {
    console.log("log in pressed")
    return fetch('https://farmshare-api.herokuapp.com/login?email=xuezhma@gmail.com&password=123456')
      .then((response) => response.json())
      .then((responseJson) => {
        AlertIOS.alert(JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.error(error);
      });
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
        {/*<TextInput
          style={styles.login}
          placeholder="password"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
        />*/}
        <Button
          style={styles.button}
          onPress={() => this._handlePress()}>
          Sign In
      </Button>
      </View>
    );
  }
}


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
