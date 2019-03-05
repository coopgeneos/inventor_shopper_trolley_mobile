'use strict';

import React, { Component } from 'react';

import {
  Alert,
  AppRegistry,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';

import moment from "moment";
import { BarCodeScanner, Permissions } from 'expo';
import { 
  setTrolley,
  verifyTrolley,
  dropTrolley,
  verifyMyTrolley
 } from "../services/TrolleyService";

export default class ScanScreen extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    type: this.props.navigation.state.params.type
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  constructor(props){
    super(props);
    this.setTrolley = setTrolley;
    this.verifyTrolley = verifyTrolley;
    this.dropTrolley = dropTrolley;
    this.verifyTrolley = verifyMyTrolley;
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    console.log(result.data);
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      Alert.alert(
        'Qr code detected',
        "Pick-up trolley #"+result.data+" - Current Time "+moment().format("hh:mm a"),
        [
                {text: 'Cancel', onPress: () => this.props.navigation.replace('PickUp')},
                {text: 'Confirm', onPress: () => {
                  this.verifyTrolley(result.data).then((exist)=>{
                    var trolley = {
                      number: result.data,
                      startTime: moment(),
                      endTime: null
                    }

                    if(exist){
                        if(this.state.type == 'pick'){

                          this.verifyMyTrolley(trolley.number).then((exist)=>{
                            if(!exist){
                              this.setTrolley(trolley).then(()=>{
                                Alert.alert('Success','Trolley #'+result.data+' picked up!',
                                [{text:'Ok', onPress: ()=>this.props.navigation.replace('PickUp')}])
                              });
                            }else{
                              Alert.alert('Error','Trolley #'+result.data+' is already picked up!',
                                [{text:'Ok', onPress: ()=>this.props.navigation.replace('PickUp')}])
                            }
                            
                          })
                          
                        }else{
                          
                          this.dropTrolley(result.data).then(()=>{
                            Alert.alert('Success','Trolley #'+result.data+' dropped!',
                            [{text:'Ok', onPress: ()=>this.props.navigation.replace('DropOff')}])
                          });
                        }
                      }
                      else{
                        Alert.alert('Error','The scanned trolley is not valid',
                          [{text:'Ok', onPress: ()=>{
                            var screen = 'PickUp';

                            if(this.state.type == 'drop'){
                              screen = 'DropOff'
                            }
                            this.props.navigation.replace(screen);
                          }
                        }])
                      }
                  })
                } },
              ],
              {cancelable: false},
      );
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      
      <View>
          {this.state.hasCameraPermission === null
            ? <Text>Requesting for camera permission</Text>
            : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                  </Text>
                : <BarCodeScanner
                    onBarCodeRead={this._handleBarCodeRead}
                    style={{height:Dimensions.get('window').height,width: Dimensions.get('window').width}}>
                    <Text style={styles.description}>Scan your QR code</Text>
                    <ImageBackground source={require("../assets/images/iconos/qr-scan.png")} 
                    style={{width: '100%', height: '100%'}}>

                    </ImageBackground>
                  </BarCodeScanner>}

          {this._maybeRenderUrl()}

          <StatusBar hidden />
        </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    position: 'absolute',
    fontSize: width * 0.09,
    marginTop: '5%',
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);
