import { AsyncStorage } from 'react-native';
import { getExampleUsers } from "./ExampleDataService";
import { getActiveUser } from "./AuthService";
import moment from "moment";



export const pickUpTrolley = (trolleyData) => {
   
    var user = null;
   
    getActiveUser().then((data)=>{
        
        user = JSON.parse(data);

        trolley = {
            userId: user.id,
            trolley: trolleyData
        }
        
        setTrolley(trolley).then(()=>{

            getTrolleys().then((data)=>{
                console.log("TROLLEYS",data);
            });

        });
    });


}

export const verifyTrolley = (trolleyNumber) => {

    let promise = new Promise((resolve,reject)=>{

        getTrolleys().then((trolleys)=>{
            trolleys = JSON.parse(trolleys);
            console.log(JSON.stringify(trolleys));
            exist = false;

            if(trolleys){
                trolleys.forEach(trolley => {
                    if(trolley.number == trolleyNumber){
                        exist = true;
                    }
                });
            }

            resolve(exist);

        });

    });

    return promise;


}

export const verifyMyTrolley = (trolleyNumber) => {

    let promise = new Promise((resolve,reject)=>{

        getMyTrolleys().then((trolleys)=>{
            trolleys = JSON.parse(trolleys);
            console.log(JSON.stringify(trolleys));
            exist = false;

            if(trolleys){
                trolleys.forEach(trolley => {
                    if(trolley.number == trolleyNumber){
                        exist = true;
                    }
                });
            }

            resolve(exist);

        });

    });

    return promise;


}

export const getTrolleys = () => {

    return AsyncStorage.getItem('trolleys');

}

export const getMyTrolleys = () => {

    return AsyncStorage.getItem('myTrolleys');

}

export const setTrolley = (trolley) =>{
  
    let promise = new Promise((resolve,reject)=>{


        getMyTrolleys().then((trolleys)=>{
            
            trolleys = JSON.parse(trolleys);

            if(trolleys){
                trolleys.push(trolley);
            }else{
                trolleys = [trolley];
            }
            
           AsyncStorage.setItem('myTrolleys',JSON.stringify(trolleys)).then(()=>{
               resolve();
           });

        });

    });


    return promise;

}

export const dropTrolley = (trolleyNumber) =>{
  
    let promise = new Promise((resolve,reject)=>{


        getMyTrolleys().then((trolleys)=>{
            
            trolleys = JSON.parse(trolleys);

            trolleysUpdated = [];

            trolleys.forEach(trolley => {
                if(trolley.number == trolleyNumber){
                    trolley.endTime = moment();
                }

                trolleysUpdated.push(trolley);
            });
            
           AsyncStorage.setItem('myDroppedTrolleys',JSON.stringify(trolleys)).then(()=>{
               getMyDroppedTrolleys().then((data)=>{
                   console.log(JSON.stringify(data));
               })
               AsyncStorage.removeItem('myTrolleys').then(()=>{

                   resolve();
               });
           });

        });

    });


    return promise;

}

export const getMyDroppedTrolleys = () =>{
    return AsyncStorage.getItem('myDroppedTrolleys');

}