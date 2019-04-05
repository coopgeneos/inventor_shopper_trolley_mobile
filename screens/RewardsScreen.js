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
  Linking,
} from 'react-native';


import { Container, Header, Content, Footer, FooterTab, Text, 
  Button, Icon, CheckBox, List, ListItem, Form, Item, Label,
  Input, Spinner, Body, Left, Title, Right, Thumbnail, Radio, Col } from 'native-base';

import { Grid, Row } from "react-native-easy-grid";
import Gallery from 'react-native-image-gallery';


import { WebBrowser } from 'expo';
import HeaderNavBar from '../components/HeaderNavBar';
import FooterNavBar from '../components/FooterNavBar';
import { MonoText } from '../components/StyledText';

import { getTodayRewards } from "../services/TrolleyService";
import moment from 'moment';
export default class RewardsScreen extends React.Component {

  constructor() {
    super();
    this.getTodayRewards = getTodayRewards.bind(this);
    this.state = {
      pointsRewards: [50,80,135,180],
      rewards:{
        count: 0,
        rewards: 0,
        trolleys: []
      },
      lastUpdate:'',
      images: [
        {
          caption: '50 points',
          source: require('../assets/images/rewards/Slider_App-Coles-Flybuys.png'),
          dimensions: { width: 251, height: 315 }
        },
        {
          caption: '80 points',
          source: require('../assets/images/rewards/Slider_App-Frequent-Flyer.png'),
          dimensions: { width: 251, height: 315 }
        },
        {
          caption: '135 points',
          source: require('../assets/images/rewards/Slider_App-Myer.png'),
          dimensions: { width: 251, height: 315 }
        },
        {
          caption: '180 points',
          source: require('../assets/images/rewards/Slider_App-Rewards.png'),
          dimensions: { width: 251, height: 315 }
        },
      ]
    };
    this.onChangeImage = this.onChangeImage.bind(this);
    
    this.getTodayRewards().then(( response )=>{
      this.setState( {rewards:response} )
      this.getLastUpdate();
    })

  }

  onChangeImage (index) {
      this.setState({ index });
  }

  renderError () {
      return (
          <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>This image cannot be displayed...</Text>
              <Text style={{ color: 'white', fontSize: 15, fontStyle: 'italic' }}>... but this is fine :)</Text>
          </View>
      );
  }

  get caption () {
    const { images, index } = this.state;
    return (
        <View style={{ bottom: 0, height: 65, width: '100%', position: 'absolute', justifyContent: 'center', padding: 10 }}>
            <Text onPress={() => this.changePointView(index)} style={{ textAlign: 'center', color: 'white', fontSize: 24, fontStyle: 'italic', padding: 10 }}>{ (images[index] && images[index].caption) || '' } </Text>
        </View>
    );
}

get galleryCount () {
    const { index, images } = this.state;
    return (
        <View style={{ top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'right', color: 'white', fontSize: 14, fontStyle: 'italic', paddingRight: '10%' }}>{ index + 1 } / { images.length }</Text>
        </View>
    );
}

changePointView(index) {
  console.log('R: ' + this.state.rewards.rewards);
  console.log('RA: ' + this.state.pointsRewards);
  console.log('I: ' + index);
  
  var ppc = this.state.rewards.rewards - this.state.pointsRewards[index];

  if(ppc < 0) {
    
    Alert.alert(
      'Change Reward',
      'You have insufficient points for this transaction',
      [
        {text: 'Return', onPress: () => console.log('KO Change')},
      ],
      {cancelable: false},
    );

  } else {

    Alert.alert(
      'Change Reward',
      'Points availables: ' + this.state.rewards.rewards + '\nPoints post change: ' + ppc,
      [
        {text: 'Change', onPress: () => console.log('OK Change')},
      ],
      {cancelable: false},
    );

  }

  

}




  // componentDidMount() {
  //   var that = this;
  //   let items = Array.apply(null, Array(60)).map((v, i) => {
  //     //Loop to make image array to show in slider    
  //     return {
  //       source: {
  //         uri: 'http://placehold.it/100x100?text=' + (i + 1),
  //       },
  //     };
  //   });
  //   that.setState({ items });
  // }
  
  
  static navigationOptions = {
    header: null,
  };

  getLastUpdate = () => {

    var trolleysLength = this.state.rewards.trolleys.length;
    var endTime = moment(endTime).format('MM/DD/YYYY HH:mm a');

    if(trolleysLength > 0){

      endTime = this.state.rewards.trolleys[ trolleysLength - 1 ].endTime;
      endTime = moment(endTime).format('MM/DD/YYYY HH:mm a');

    }

    this.setState({lastUpdate: endTime});

  }


  render() {
    const {value} = this.state;
    return (

      <Container>
        <HeaderNavBar navigation={this.props.navigation}  title="Rewards" />
        <Content>
          
        <Grid style={{ alignItems: 'center'}}>
          <Row style={{ height: 40, marginTop: 5 }}>
            <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 28 }}> { this.state.rewards.rewards } Points</Text>
                 
          </Row>
          <Row  style={{ height: 40, marginTop: 5 }}>
            <Text style={{ textAlign: 'center', color: '#0f3753', fontSize: 16 }}> Last updated: { this.state.lastUpdate }</Text>
          </Row>
           <Row style={{ height: 200, marginTop: 5}}>
                 <Gallery
                  style={{ flex: 1, backgroundColor: '#FFF' }}
                  images={this.state.images}
                  errorComponent={this.renderError}
                  onPageSelected={this.onChangeImage}
                  initialPage={0}
                />
                 { this.caption }
           </Row>
           <Row style={{ height: '100%', marginTop: 20, paddingLeft:20, paddingRight: 20 }}>
              <Content>
                 <Text style={{ textAlign: 'justify'}}>
                 Please visit the next link for more information and instructions on how to redeem.
                 </Text>
                 <Text style={{ textAlign: 'justify', color: '#0000FF' }} onPress={() => { Linking.openURL('http://shoppertrolley.com.au/rewards'); }}>
                 www.shoppertrolley.com.au/rewards 
                 </Text>
              </Content>
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
    flexDirection: 'column',
    justifyContent: 'center',
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
