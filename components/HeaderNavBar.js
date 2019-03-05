import React from 'react';

import { Header, Left, Title, Body, Right, Text, Button, Icon } from 'native-base';
import {  ImageBackground, Image } from 'react-native';

export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack(){
    if(this.props.navigation.state.params && this.props.navigation.state.params.onGoBack){
      this.props.navigation.state.params.onGoBack();
    }
    this.props.navigation.goBack()
  }
  
  render() {

    return (
        <Header>
          
          <ImageBackground source={require("../assets/images/background-01.png")} 
          style={{width: '100%', height: '100%'}}>
          <Left>
            <Image source={require("../assets/images/logo.png")} 
            style={{width: 100, height: 100}} />
          </Left>
          <Body>
            
          </Body>
          <Right>

            <Button transparent onPress={() => this.props.navigation.navigate('PickUp')}  style={{fontSize: 30}}>
              <Icon name='home'/>
            </Button>
            <Button transparent onPress={() => this.props.navigation.navigate('Login')} style={{fontSize: 30}}>
              <Icon name='log-out'/>
            </Button>

          </Right>
          </ImageBackground>

        </Header>    );
  }  
}