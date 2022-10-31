const db = require('../config/connection')
const objectId = require('mongodb').ObjectId

module.exports= {
    addBlogs:(blogData,callback)=>{
        db.get().collection('blogs').insertOne(blogData).then((data)=>{
            callback(true)
        })
    },
    getAllBlogs:()=>{
        return new Promise(async (resolve,reject)=>{
            let blogs = await db.get().collection('blogs').find().toArray();
            resolve(blogs);
        })
    },
    deleteBlog:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('blogs').deleteOne({_id:objectId(id)}).then((returnVal)=>{
                console.log(returnVal);
                resolve(returnVal)
            })
        })
    }
}