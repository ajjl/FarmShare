'use strict'



import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon, Badge } from 'native-base';


import styles from './styles'

var myStyles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
})

class JobDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <View style={styles.container}>

      <Text> Job Name: {this.props.job.name} </Text>

    </View>
  )
  }
}
