import {AsyncStorage} from 'react-native';


export const addExampleData = () => {
    addExampleUsers();
}

addExampleUsers = () => {

    var data = require('../assets/exampleData/Users.json');
    
    try {
        AsyncStorage.setItem('users', JSON.stringify(data.users));
     } catch (error) {
       console.error("ERROR ADDING EXAMPLE USERS",error);
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