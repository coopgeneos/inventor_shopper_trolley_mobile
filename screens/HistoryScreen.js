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
import FooterNavBar from '../components/FooterNavBar';
import { MonoText } from '../components/StyledText';

const datas = [
  ["Simon Mignolet", '21/02/2019', '53'],
  ["Nathaniel Clyne", '21/03/2019', '59'],
  ["Dejan Lovren", '21/04/2019', '25'],
  ["Alberto Moreno", '21/05/2019', '55'],
  ["Simon Mignolet", '21/06/2019', '15']
];

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderNavBar navigation={this.props.navigation} title="Actividades" />     
        <Grid style={{ alignItems: 'center'}}>
          {/* <Row style={{ height: '30%', }}>
          <ImageBackground source={require("../assets/images/background-01.png")} style={{width: '100%', height: '100%'}}>
            <Image source={require("../assets/images/logo.png")} style={{width: 100, height: 100}}>

            </Image>
          </ImageBackground>
          </Row> */}
          <Row style={{ flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 10,
                        backgroundColor: "#FFF", height: '70%'}}>
          <ScrollView>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem>
                <Left>
                  <Text>
                    {data[1]}{"\n"}{data[0]}
                  </Text>
                </Left>
                <Right>
                  <Text>
                    {data[2]} Points <Icon name="play" />
                  </Text>
                </Right>
              </ListItem>} />
          </ScrollView>
          </Row>
        </Grid> 
        <FooterNavBar navigation={this.props.navigation} />   
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
