import { AsyncStorage } from 'react-native';
import { getExampleUsers } from "./ExampleDataService";
import { getActiveUser } from "./AuthService";

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

export const getTrolleys = () => {

    return AsyncStorage.getItem('trolleys');

}

export const setTrolley = (trolley) =>{
  
    let promise = new Promise((resolve,reject)=>{


        getTrolleys().then((trolleys)=>{
            
            trolleys = JSON.parse(trolleys);

            if(trolleys){
                trolleys.push(trolley);
            }else{
                trolleys = [trolley];
            }
            
           AsyncStorage.setItem('trolleys',JSON.stringify(trolleys)).then(()=>{
               resolve();
           });

        });

    });


    return promise;

}