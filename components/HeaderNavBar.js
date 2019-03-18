import React from 'react';

import { Header, Left, Title, Body, Right, Text, Button, Icon, View } from 'native-base';
import {  ImageBackground, Image, Dimensions } from 'react-native';
import { logout } from "../services/AuthService";
export default class HeaderNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = logout.bind(this);
  }

  goBack(){
    if(this.props.navigation.state.params && this.props.navigation.state.params.onGoBack){
      this.props.navigation.state.params.onGoBack();
    }
    this.props.navigation.goBack()
  }
  
  render() {

    return (
        // <Header style={{ height: 100, paddingLeft: 0, paddingRight: 0 }}>
          
        //   <ImageBackground source={require("../assets/images/iconos/fondo_nav.png")} 
        //   style={{ width: '100%', height: '100%', marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }}>
        //   <View>
        //     <Image source={require("../assets/images/logo.png")} 
        //     style={{width: 60, height: 60}} />

        //     <Button transparent onPress={() => this.props.navigation.navigate('PickUp')}  style={{fontSize: 30}}>
        //       <Icon name='home'/>
        //     </Button>
        //     <Button transparent onPress={() => this.props.navigation.navigate('Login')} style={{fontSize: 30}}>
        //       <Icon name='log-out'/>
        //     </Button>

        //   </View>
        //   </ImageBackground>

        // </Header>    
        <Header style={{ height: 110, backgroundColor: '#113851'}}>  
          <Left>
          <Image source={require("../assets/images/logo.png")} style={{width: 60, height: 60}} />
          </Left>
          <Body>
            <Title style={{paddingLeft: 20}}>{this.props.title}</Title>
          </Body>
          <Right>
          <Button transparent onPress={() => this.props.navigation.navigate('PickUp')} >
            <Icon name='home' style={{fontSize: 30}}/>
          </Button>
          <Button transparent onPress={() => {
            this.logout().then(()=>{
              this.props.navigation.navigate('Login');
            });
          }} >
            <Icon name='log-out' style={{fontSize: 30}}/>
          </Button>
          </Right>
        </Header>
    );
  }  
}