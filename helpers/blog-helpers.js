const db = require("../config/connection");
const objectId = require("mongodb").ObjectId;

module.exports = {
  addBlogs: (blogData, callback) => {
    db.get().collection("blogs").insertOne(blogData);
    callback();
  },
  getAllBlogs: () => {
    return new Promise(async (resolve, reject) => {
      let blogs = await db.get().collection("blogs").find().toArray();
      resolve(blogs);
    });
  },
  deleteBlog: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("blogs")
        .deleteOne({ _id: objectId(id) });
      resolve();
    });
  },
  getOneBlog: (id) => {
    return new Promise(async (resolve, reject) => {
      let blog = await db
        .get()
        .collection("blogs")
        .findOne({ _id: objectId(id) });
      resolve(blog);
    });
  },
  editBlog: (blog, id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("blogs")
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              author_name: blog.author_name,
              title: blog.title,
              blogContent: blog.blogContent,
            },
          }
        );
      resolve();
    });
  },
};
