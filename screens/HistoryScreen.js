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

import { Grid, Row, Col } from "react-native-easy-grid";


import { WebBrowser } from 'expo';
import HeaderNavBar from '../components/HeaderNavBar';
import FooterNavBar from '../components/FooterNavBar';
import { MonoText } from '../components/StyledText';
import { getHistoryRewards } from "../services/TrolleyService";
import moment from "moment";

// Recuperar desde los registros que se van haciendo con la app

const datas = [
  ["Simon Mignolet", '21/02/2019', '53'],
  ["Nathaniel Clyne", '21/03/2019', '59'],
  ["Dejan Lovren", '21/04/2019', '25'],
  ["Alberto Moreno", '21/05/2019', '55'],
  ["Simon Mignolet", '21/06/2019', '15'],
  ["Simon Mignolet", '21/06/2019', '15'],
  ["Simon Mignolet", '21/06/2019', '15']
];

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  

  constructor(props){
    super(props);

    this.state = {
      rewards:{
        count: 0,
        rewards: 0,
        trolleys: []
      }
    }

    this.getHistoryRewards = getHistoryRewards.bind(this);

    this.getHistoryRewards().then((rewards)=>{

      if(rewards.trolleys){
        this.setState({
          rewards: rewards
        });
      }

    });

    
  }

  render() {
    return (

      <Container>
        <HeaderNavBar navigation={this.props.navigation}  title="History" />
        <Content>
          
        <Grid style={{ alignItems: 'center'}}>
          <Row style={{ height: 60, marginTop: 5 }}>
          <Col style={{ width: '50%' }}>
          <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 28 }}> { this.state.rewards.trolleys.length }</Text>
          <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 16 }}> Returns </Text>
          </Col>
          <Col style={{ width: '50%' }}>
          <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 28 }}> { this.state.rewards.rewards } Points</Text>
          <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 16 }}> Total earned</Text>
          </Col>                
          </Row>
          <Row style={{ marginTop: 15 }}>
          <ScrollView>
          <List
            dataArray={this.state.rewards.trolleys}
            renderRow={data =>
              <ListItem style={{ borderColor: '#E58831', paddingRight: 10 }}>
                <Left>
                  <Text>
                  {/* <Text style= {{ fontWeight: "bold" }}></Text> */}
                    { moment(data.startTime).format('MM/DD/YYYY') }{"\n"}{data.name}
                  </Text>
                </Left>
                <Right style={{ width: 150 }}>
                  <Text  onPress={() => alert('XX')} style={{ borderColor: '#E58831', fontSize: 18, textAlign: 'right', paddingRight: 10, width: 150}}>
                    { data.points } Points    <Icon name="play" style={{ color: '#E58831'}} />
                  </Text>
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
