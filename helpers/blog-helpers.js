const db = require('../config/connection')

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
    
}