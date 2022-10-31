const db = require('../config/connection')
const bcrypt = require('bcrypt')

module.exports= {
    // addUsers:(userData,callback)=>{
    //     userData.password = bcrypt.hash(userData.password,10,()=>{
    //         console.log(userData);
    //         db.get().collection('users').insertOne(userData).then((data)=>{
    //             callback(true)
    //         })
    //     }).then()
    // },
    addUsers:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.password = await bcrypt.hash(userData.password,10)
            db.get().collection('users').insertOne(userData).then((data)=>{
                console.log(data);
                resolve(data.insertedId)
            })
        })
    },
    getAllUsers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users = await db.get().collection('users').find().toArray()
            resolve(users);
        })
    },
    getLoginDetails:(userDetails)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response={};
            let user = await db.get().collection('users').findOne({username: userDetails.username})
            if(user){
                bcrypt.compare(userDetails.password,user.password).then((status)=>{
                    if(status){
                        response.user=user;
                        response.status=true;
                        resolve(response)
                    }else{
                        resolve({status:false})
                    }
                })
            }else{
                resolve({status:false})
            }
        })
    }
}