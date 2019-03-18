import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  Switch
} from 'react-native';

import { Container, Header, Content, Footer, FooterTab, Text, 
  Button, Icon, CheckBox, List, ListItem, Form, Item, Label,
  Input, Spinner, Body, Left, Title, Right, Thumbnail, Radio } from 'native-base';

import { Grid, Row } from "react-native-easy-grid";
import { login,isLoggedIn } from "../services/AuthService";
import { addExampleData,clearAsyncStorage } from "../services/ExampleDataService";
import { pickUpTrolley,getMyTrolleys } from "../services/TrolleyService";

import { WebBrowser } from 'expo';
import HeaderNavBar from '../components/HeaderNavBar';
import FooterNavBar from '../components/FooterNavBar';
import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  
  
  constructor(props){
    super(props);
    this.login = login.bind(this);
    this.addExampleData = addExampleData.bind(this);
    this.pickUpTrolley = pickUpTrolley.bind(this);
    this.getMyTrolleys = getMyTrolleys.bind(this);
    this.clearAsyncStorage = clearAsyncStorage.bind(this);
    this.isLoggedIn = isLoggedIn.bind(this);
    
    this.state = { SwitchValue: false };

    
    this.state = {
      checked: true,
    };

    // console.log(this.state.checked);

    this.isLoggedIn().then((isLogged)=>{
      if( isLogged ){
        this.getMyTrolleys().then((trolleys)=>{
          console.log(trolleys);
  
          if(trolleys){
            this.props.navigation.navigate('DropOff');
          }else{
            this.props.navigation.navigate('PickUp');
          }
        });
      }
    })


    // this.clearAsyncStorage().then(()=>{
    this.addExampleData();
    // });

    this.state = {
      username: null,
      password: null
    }
  }



  _handleLogin(){

    if(!this.state.username  || !this.state.password){
      Alert.alert(
        'Error',
        'Username or password can not be null',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }else{

      var login = this.login(this.state.username,this.state.password,this.state.SwitchValue).then((data)=>{
        if(data.status){

          this.getMyTrolleys().then((trolleys)=>{
            console.log(trolleys);

            if(trolleys){
              this.props.navigation.navigate('DropOff');
            }else{
              this.props.navigation.navigate('PickUp');
            }
          })
        
        }else{

          Alert.alert(
            'Error',
            'Invalid credentials',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
        
      });

    }
  }

  _handleSwitch = () => {

    this.setState(state =>{
      checked: !state.checked
    });
  }  

  render() {
    

    return (
      <ImageBackground source={require("../assets/images/fondoHome.jpeg")} 
      style={{width: '100%', height: '100%'}}>

      <View style={styles.container}>

        <Grid style={{ alignItems: 'center'}}>
          <Row style={{ flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        justifyContent: "center" }}>

          <Form>
            <Item style={{ borderColor: '#FFF' }}>
              <Text style={{ color: "#113851", fontSize: 40, borderColor: '#FFF'}}>¡WELCOME!</Text>
            </Item>
            <Item style={{ borderColor: '#FFF' }}>
            <Text style={{ color: "#E58831", fontSize: 40, borderColor: '#FFF'}}>Shopper Trolley</Text>
            </Item>
            <Item rounded style={{ marginTop: 5, width: '70%'}}>
              <Input placeholder="Username"   onChangeText={(text) => this.setState({username: text})} />
            </Item>
            <Item rounded style={{ marginTop: 5, width: '70%'}}>
              <Input placeholder="Password"  secureTextEntry onChangeText={(text) => this.setState({password: text})} />
            </Item>
            <Item style={{ marginTop: 5, borderColor: '#FFF' }}>
              <Text style={{ width: '60%' }}>Login Once</Text>
              <Switch
                // color={"#113851"}
                // selectedColor={"#E58831"}
                // style={{ width: '10%' }}
                onValueChange={(value) => this.setState({SwitchValue: value})}
                value={this.state.SwitchValue}
                // onPress={() => this.setState({checked: !this.state.checked})}
              />
            </Item>
            <Item style={{ marginTop: 5, borderColor: '#FFF' }}>
              <Button rounded onPress={ this._handleLogin.bind(this) }

                style={{ fontSize: 40, color: '#FFF', backgroundColor: '#E58831'}}>
              <Text>Log In</Text>
              </Button>
            </Item>
            <Item style={{ marginTop: 5, borderColor: '#FFF' }}>
              <Text onPress={() => this.props.navigation.navigate('Users')} style={{ color: "#E58831", fontSize: 12, borderColor: '#FFF'}}>Forgot password ?</Text>
            </Item>
          </Form>
          {/* </ScrollView> */}
          </Row>
        </Grid>   
      </View>
      </ImageBackground>        

    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 280,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
