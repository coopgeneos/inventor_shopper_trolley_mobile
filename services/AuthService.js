import {AsyncStorage} from 'react-native';
import { getExampleUsers } from "./ExampleDataService";

export const login = (username,password,remember) => {

    let promise = new Promise((resolve,reject)=>{

        exist(username).then((user)=>{

            if(user){

                if(user.password == password){
                    if(remember){
                        setActiveUser(user);
                    }
                    resolve({status:true,message:"El usuario se ha logueado exitosamente",user:user});
                }else{
                    resolve({status:false,message:"Las contraseñas no coinciden"});
                }

            }else{
                createUser(username,password).then((userData)=>{
                    if(remember){
                        setActiveUser(userData);
                    }
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
    AsyncStorage.removeItem('user');
}

export const getActiveUser = () => {
    return AsyncStorage.getItem('user');
}

export const getUsers = () => {
    return AsyncStorage.getItem('users');
}

export const removeUser = (username) => {
    
    console.log(username);

    let promise = new Promise((resolve,reject)=>{

        newUsersList = [];

        getUsers().then((users)=>{

            if(users){
                users = JSON.parse(users);
                users.forEach(user => {
                    console.log(user);
                    if(user.username != username){
                        newUsersList.push(user);
                    }
                });
                AsyncStorage.setItem('users',JSON.stringify(newUsersList)).then(()=>{

                });
                resolve(newUsersList);
            }

        })

    });

    return promise;

}

export const loginOnce = (user) => {

    let promise = new Promise((resolve,reject)=>{

        setActiveUser(user);
        resolve();

    });

}

export const logout = () => {

    let promise = new Promise((resolve,reject)=>{

        unsetActiveUser();
        resolve();

    });

    return promise;
}

export const isLoggedIn = () => {

    let isLoggedIn = false;

    let promise = new Promise((resolve, reject) => {
        
        getActiveUser().then((user)=>{
            if( user ){
                isLoggedIn = true;
            }
            console.log("IS LOGGED IN?");
            console.log(isLoggedIn);
            resolve(isLoggedIn);
        })

    });

    return promise;

}