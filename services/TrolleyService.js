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

export const getTodayRewards = () => {

    let promise = new Promise((resolve,reject)=>{

        getMyDroppedTrolleys().then((trolleys)=>{
            trolleys = JSON.parse(trolleys);
            var filteredTrolleys = new Array();
            var count = 0;
            var rewards = 0;
            
          
            if(trolleys){
         
                trolleys.forEach(trolley => {
                    console.log(trolley);
                    trolleyStartTime = moment(trolley.startTime);
                    todayTime = moment();

                    trolleyDate = trolleyStartTime.format('MM/DD/YYYY');
                    todayDate = todayTime.format('MM/DD/YYYY');
                    console.log(trolleyDate);
                    console.log(todayDate);

                    if(todayDate == trolleyDate){
                        filteredTrolleys.push(trolley);
                        count += 1;
                        rewards += +trolley.points;
                    }

                    

                });

            }

            resolve({
                count: count,
                rewards: rewards,
                trolleys: filteredTrolleys
            });


        })


    });

    return promise;

}


export const getHistoryRewards = () => {

    let promise = new Promise((resolve,reject)=>{

        getMyDroppedTrolleys().then((trolleys)=>{
            trolleys = JSON.parse(trolleys);
            var count = 0;
            var rewards = 0;
            
            console.log("--------TROLLEYS IN HISTORY--------");
            console.log(trolleys);
            console.log("-------TROLLEYS IN HISTORY--------");

            if(trolleys){
                console.log("ACAAAAAAA");
                trolleys.forEach(trolley => {
                    console.log(trolley);
                    count += 1;
                    rewards += +trolley.points;

                });

            }

            resolve({
                count: count,
                rewards: rewards,
                trolleys: trolleys
            });


        })


    });

    return promise;
}

export const verifyTrolley = (trolleyNumber) => {

    let promise = new Promise((resolve,reject)=>{

        getTrolleys().then((trolleys)=>{
            trolleys = JSON.parse(trolleys);
            console.log(JSON.stringify(trolleys));
            exist = false;
            var existentTrolley = null;
            if(trolleys){
                trolleys.forEach(trolley => {
                    if(trolley.number == trolleyNumber){
                        exist = true;
                        existentTrolley = trolley;
                    }
                });
            }

            resolve({exist:exist,trolley:existentTrolley});

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
            trolleyToPush = null;

            trolleys.forEach(trolley => {
                if(trolley.number == trolleyNumber){
                    trolley.endTime = moment();
                }

                trolleysUpdated.push(trolley);
                trolleyToPush = trolley;
            });

            getMyDroppedTrolleys().then((droppedTrolleys)=>{
                
                droppedTrolleys = JSON.parse(droppedTrolleys);

                if(droppedTrolleys){
                    
                    droppedTrolleys.push(trolleyToPush);

                }else{
                    droppedTrolleys = trolleysUpdated;
                }

                AsyncStorage.setItem('myDroppedTrolleys',JSON.stringify(droppedTrolleys)).then(()=>{
                    getMyDroppedTrolleys().then((data)=>{
                        console.log(JSON.stringify(data));
                    })
                    AsyncStorage.removeItem('myTrolleys').then(()=>{
                        resolve();
                    });
                });

            })
            
           

        });

    });


    return promise;

}

export const getMyDroppedTrolleys = () =>{
    return AsyncStorage.getItem('myDroppedTrolleys');

}