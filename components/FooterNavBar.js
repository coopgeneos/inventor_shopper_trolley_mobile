import React from 'react';

import { Footer, FooterTab, Text, Button, Icon } from 'native-base';

import { ImageBackground } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';


export default class FooterNavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
        <Footer>
          <ImageBackground source={require("../assets/images/iconos/fondo_nav.png")} style={{width: '100%', height: '100%'}}>
          
          <FooterTab>
            <Button vertical { ...{active: this.props.navigation.state.routeName == 'Rewards' ? true : false} }  onPress={() => this.props.navigation.navigate('Rewards')}>
              <Icon name="medal" />
              <Text>Rewards</Text>
            </Button>
            <Button vertical { ...{active: this.props.navigation.state.routeName == 'History' ? true : false} }  onPress={() => this.props.navigation.navigate('History')}>
              <Icon active name="time" />
              <Text>History</Text>
            </Button>
            <Button vertical { ...{active: this.props.navigation.state.routeName == 'Settings' ? true : false} }  onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name="cog" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>

          </ImageBackground>
        </Footer>
    );
  }  
}