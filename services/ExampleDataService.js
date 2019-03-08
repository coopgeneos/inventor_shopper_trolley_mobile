import {AsyncStorage} from 'react-native';

export const clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

export const addExampleData = () => {
    addExampleUsers();
    addExampleTrolleys();
}

addExampleUsers = () => {

    var data = require('../assets/exampleData/Users.json');
    
    try {
        AsyncStorage.setItem('users', JSON.stringify(data.users));
     } catch (error) {
       console.error("ERROR ADDING EXAMPLE USERS",error);
     }
}

addExampleTrolleys = () => {
  var data = require('../assets/exampleData/Trolleys.json');
    
  try {
      AsyncStorage.setItem('trolleys', JSON.stringify(data.trolleys));
   } catch (error) {
     console.error("ERROR ADDING EXAMPLE TROLLEYS",error);
   }
}

export const getExampleUsers =  () => {

    try {
      const value =  AsyncStorage.getItem('users');
      if (value !== null) {
        return value;
      }
    } catch (error) {
        console.error("ERROR GETTING EXAMPLE USERS",error);
    }
    
};