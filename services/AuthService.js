import {AsyncStorage} from 'react-native';
import { getExampleUsers } from "./ExampleDataService";

export const login = (username,password) => {

    let promise = new Promise((resolve,reject)=>{

        exist(username).then((user)=>{

            if(user){

                if(user.password == password){
                    setActiveUser(user);
                    resolve({status:true,message:"El usuario se ha logueado exitosamente",user:user});
                }else{
                    resolve({status:false,message:"Las contraseñas no coinciden"});
                }

            }else{
                createUser(username,password).then((userData)=>{
                    setActiveUser(userData);
                    resolve({status:true,message:"El usuario se ha creado exitosamente",user:userData});
                })
                .catch((error)=>{
                    resolve({status:false,message: error});
                });

            }
        });
            
    });


    return promise;
    


}

export const exist = (username)=>{

    let promise = new Promise((resolve,reject)=>{

        getExampleUsers().then((data)=>{

            let users = [];
            
            console.log(data);

            users = JSON.parse(data);
    
            var filteredUsers = users.filter(
                (user) => user.username == username
            );
    
            resolve(filteredUsers[0]);
    
        })
        .catch((error)=>{
            console.log(error);
        });

    });

    return promise;

}


export const createUser = (username,password) => {

    let promise = new Promise((resolve,reject)=>{

        getExampleUsers().then((data)=>{

            let users = [];
    
            users = JSON.parse(data);
            
            var newUser = {
                id: users.length +1,
                username: username,
                password: password
            };

            users.push(newUser);
    
            try {
                AsyncStorage.setItem('users', JSON.stringify(users));
                resolve(newUser);
             } catch (error) {
               console.error("ERROR ADDING EXAMPLE USERS",error);
             }
    
        });

    });

    return promise;

}


export const setActiveUser = (user) =>{
    AsyncStorage.setItem('user', JSON.stringify(user));
}

export const unsetActiveUser = () =>{
    AsyncStorage.setItem('user', null);
}

export const getActiveUser = () => {
    return AsyncStorage.getItem('user');
}