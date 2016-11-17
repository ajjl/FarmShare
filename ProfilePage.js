'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  AlertIOS,
  StyleSheet,
  Navigator
} from 'react-native';

import { Container, Content, List, ListItem, Text, Icon, Badge,CheckBox } from 'native-base';

import JobDetail from './JobDetail'
import styles from './styles'
import UserProviderInfoPage from './UserProviderInfoPage'

var myStyles = StyleSheet.create({
  navContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight+50
  },
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


class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }
   _goToUserProviderInfo() {
     this.props.navigator.push ({
       title: 'User Provider Info',
       component: UserProviderInfoPage,
       passProps: {
         user: this.props.user
       }
     })
   }

  render() {
    return (
      <View style={myStyles.navContainer}>
      <Text> User: {this.props.user.fullname} </Text>
      <Container>
            <Content>
                <List>
                    <ListItem >
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>Name: </Text>
                        <Text >{this.props.user.fullname}</Text>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>email: </Text>
                        <Text > {this.props.user.email}</Text>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>Zipcode: {this.props.user.zipcode}</Text>
                        <Text >Click to edit</Text>
                        </View>
                    </ListItem>
                    <ListItem >
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>ProviderInfo: </Text>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>Max Distance: {this.props.user.zipcode}</Text>
                        <Text >Tap to edit</Text>
                        </View>
                    </ListItem>
                    <ListItem>
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>Max Distance: {this.props.user.zipcode}</Text>
                        <Text >Tap to edit</Text>
                        </View>
                    </ListItem>
                    <ListItem>
                      <CheckBox checked={true} />
                      <Text>Harvester</Text>
                    </ListItem>
                    <ListItem>
                      <CheckBox checked={false} />
                      <Text>Planter</Text>
                    </ListItem>
                </List>
            </Content>
        </Container>
      </View>
    )
  }
}

module.exports = ProfilePage;
