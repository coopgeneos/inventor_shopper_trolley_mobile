import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import { Container, Header, Content, Footer, FooterTab, Text, 
  Button, Icon, CheckBox, List, ListItem, Form, Item, Label,
  Input, Spinner, Body, Left, Title, Right, Thumbnail, Radio } from 'native-base';

import { Grid, Row } from "react-native-easy-grid";


import { WebBrowser } from 'expo';
import HeaderNavBar from '../components/HeaderNavBar';
import { MonoText } from '../components/StyledText';

export default class QRScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground source={require("../assets/images/fondoHome.jpeg")} 
      style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        {/* <HeaderNavBar navigation={this.props.navigation} title="Actividades" />      */}
        <Grid style={{ alignItems: 'center'}}>
          <Row style={{ flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 250,
                        height: '15%' }}>

            <Text style= {{ color: '#0f3753' }}>Please enter QR Code</Text>

          </Row>
          <Row style={{ flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 50,
                        height: '70%' }}>

            <Image source={require("../assets/images/iconos/QR.png")} />

          </Row>
          <Row style={{ flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 180,
                        height: '15%' }} >

            <Icon name="camera" style={{ fontSize: 80, color: '#0f3753' }} />

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
