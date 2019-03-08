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
  ["Program 1"],
  ["Program 2"],
  ["Program 3"],
  ["Program 4"]
];

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <HeaderNavBar navigation={this.props.navigation} title="Actividades" />
      //   <Grid style={{ alignItems: 'center'}}>
      //     <Row style={{ height: 120, backgroundColor: 'black', width: '100%', verticalAlign: 'middle'}}>
      //       <Image source={require("../assets/images/logo.png")} style={{width: 100, height: 100}}>
      //       </Image>
      //     </Row>
      //     <Row style={{ flexDirection: "row",
      //                   flexWrap: "wrap",
      //                   flex: 1,
      //                   justifyContent: "center",
      //                   marginTop: 10}}>
      //     <ScrollView>
      //     <List
      //       dataArray={datas}
      //       renderRow={data =>
      //         <ListItem>
      //           <Left>
      //             <Text>
      //               {data}
      //             </Text>
      //           </Left>
      //           <Right>
      //             <Icon name="play" />
      //           </Right>
      //         </ListItem>} />
      //     </ScrollView>
      //     </Row>
      //   </Grid> 
      //   <FooterNavBar navigation={this.props.navigation} />   
      // </View>
      <Container>
        <HeaderNavBar navigation={this.props.navigation}  title="Settings" />
        <Content>
          
        <Grid style={{ alignItems: 'center'}}>
          <Row style={{ height: 60, marginTop: 5 }}>
          <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 16 }}> Please choose which rewards program you would like to link to Shopper Trolley </Text>                
          </Row>
          <Row style={{ marginTop: 5 }}>
          <ScrollView>
            <List
            dataArray={datas}
            renderRow={data =>
              <ListItem style={{ borderColor: '#E58831', paddingRight: 10 }}>
                <Left>
                  <Text>
                    {data}
                  </Text>
                </Left>
                <Right>
                  <Icon name="play" style={{ color: '#E58831'}} />
                </Right>
              </ListItem>} />
          </ScrollView>
          </Row>
        </Grid>

        </Content>

        <FooterNavBar navigation={this.props.navigation} />

      </Container>
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
