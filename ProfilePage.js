'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TextInput,
  AlertIOS,
  StyleSheet,
} from 'react-native';
import { Container, Content, CheckBox, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

import styles from './styles'

var myStyles = StyleSheet.create({
  navContainer: {
    flex: 1,
    paddingTop: 100
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
    this.state = {

      planterCheckedState: this.props.user.planter || false,
      harvesterCheckedState: this.props.user.harvester || false
    }
  }

   _changeZipcode(){
     console.log("change zipcode!")
     AlertIOS.prompt(
      'Enter a value',
      null,
      text => {
        console.log("You entered "+text)
        this.props.user.zipcode = text
        console.log("this.props.user: ", this.props.user)
        this.forceUpdate()
        return this._updateUser()
      }
    )
   }

   _changeMaxDistance(){
     console.log("change zipcode!")
     AlertIOS.prompt(
      'Enter a number(KM)',
      null,
      text => {
        console.log("You entered "+text)
        this.props.user.maxDistance = +text * 1000
        this.forceUpdate()
        return this._updateUser()
      }
    )
   }

   _updateUser(){
     return(
       fetch(`https://farmshare-api.herokuapp.com/saveUser`, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(this.props.user)

       })
       .then(response => response.json())
       .catch(err => {
         console.log("Err !: ", err);
       })
     )
   }

   _harvesterChecked(){
     this.props.user.harvester = !this.props.user.harvester
     this.setState({harvesterCheckedState: !this.state.harvesterCheckedState})
     this._updateUser()
   }

   _planterChecked(){
     this.props.user.planter = !this.props.user.planter
     this.setState({planterCheckedState: !this.state.planterCheckedState})
     console.log("got herer 11")
     this._updateUser()
   }

  render() {
    console.log("THIS>STATE IS : @#@#@#@#@: " + JSON.stringify(this.state));
    return (
      <View style={myStyles.navContainer}>
      <Container>
            <Content>
                <List>
                    <ListItem >
                      <InputGroup disabled>
                        <Input inlineLabel label="First Name:" placeholder={this.props.user.fullname} />
                      </InputGroup>
                    </ListItem>
                    <ListItem>
                      <InputGroup disabled>
                        <Input inlineLabel label="username/email:" placeholder={this.props.user.email} />
                      </InputGroup>
                    </ListItem>
                    <ListItem onPress={this._changeZipcode.bind(this)}>
                      <InputGroup disabled>
                        <Input inlineLabel label="Zipcode:" placeholder={this.props.user.zipcode} />
                      </InputGroup>
                    </ListItem>
                    <ListItem >
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>ProviderInfo: </Text>
                        </View>
                    </ListItem>

                    <ListItem onPress={this._changeMaxDistance.bind(this)}>
                        <View sytle={myStyles.rowContainer}>
                        <Text style={myStyles.title}>Max Distance: {this.props.user.maxDistance/1000}km</Text>
                        <Text>Tap to edit</Text>
                        </View>
                    </ListItem>
                    <ListItem onPress={this._harvesterChecked.bind(this)}>
                      <CheckBox checked={this.state.harvesterCheckedState} />
                      <Text>Harvester</Text>
                    </ListItem>
                    <ListItem onPress={this._planterChecked.bind(this)}>
                      <CheckBox checked={this.state.planterCheckedState}/>
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
