import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList
} from 'react-native';

import { Container, Header, Content, Footer, FooterTab, Text, 
  Button, Icon, CheckBox, List, ListItem, Form, Item, Label,
  Input, Spinner, Body, Left, Title, Right, Thumbnail, Radio } from 'native-base';


import { Grid, Row } from "react-native-easy-grid";
import { getUsers,removeUser } from "../services/AuthService";

import { WebBrowser } from 'expo';
import HeaderNavBar from '../components/HeaderNavBar';
import FooterNavBar from '../components/FooterNavBar';
import { MonoText } from '../components/StyledText';

// Levantar estos usuarios de los registrados en el login más los de base de demo.

export default class UsersScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    this.state = {
      users: [],
      refreshing: false
    }

    this.getUsers = getUsers.bind(this);
    this.removeUser = removeUser.bind(this);

    this.getUsers().then(users=>{
      users = JSON.parse(users);
      console.log(users);
      this.setState({users:users});
    })

  }

  removeUserFromList(username){

    this.removeUser(username).then((users)=>{
      // users = JSON.parse(users);
      this.setState({users:users});
      this.props.navigation.navigate('Users')

    });

  }

  render() {
    return (
      <Container>
        <HeaderNavBar navigation={this.props.navigation}  title="User accounts" />
        <Content>
          
        <Grid style={{ alignItems: 'center'}}>

          <Row style={{ marginTop: 5 }}>
          <ScrollView>

            <FlatList 
            data={ this.state.users }
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={ ({item}) =>
              <ListItem style={{ borderColor: '#E58831', paddingRight: 10 }}>
                <Left>
                  <Text>
                    {item.username}
                  </Text>
                </Left>
                <Right>
                  <Icon name="close" style={{ color: '#E58831'}} onPress={ this.removeUserFromList.bind(this,item.username) }  />
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
