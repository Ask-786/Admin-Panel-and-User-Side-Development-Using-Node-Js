const db = require("../config/connection");
const bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectId;

async function validate(username, email, phone) {
  console.log(username, email, phone);
  let userFound = await db
    .get()
    .collection("users")
    .findOne({
      $or: [{ username: username }, { email: email }, { phone: phone }],
    });
  if (!userFound) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  // addUsers:(userData,callback)=>{
  //     userData.password = bcrypt.hash(userData.password,10,()=>{
  //         console.log(userData)
  //         db.get().collection('users').insertOne(userData).then((data)=>{
  //             callback(true)
  //         })
  //     }).then()
  // },
  addUsers: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      if (await validate(userData.username, userData.email, userData.phone)) {
        userData.password = await bcrypt.hash(userData.password, 10);
        db.get()
          .collection("users")
          .insertOne(userData)
          .then((data) => {
            response.status = true;
            resolve(response);
          });
      } else {
        response.status = false;
        resolve(response);
      }
    });
  },
  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db.get().collection("users").find().toArray();
      resolve(users);
    });
  },
  getQueriedUsers: (data) => {
    return new Promise(async (resolve, reject) => {
      let regExp = new RegExp(data, "i");
      let users = await db
        .get()
        .collection("users")
        .find({
          $or: [
            { name: { $regex: regExp } },
            { username: { $regex: regExp } },
            { phone: { $regex: regExp } },
            { email: { $regex: regExp } },
          ],
        })
        .toArray();
      resolve(users);
    });
  },
  getOneUser: (id) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("users")
        .findOne({ _id: objectId(id) })
        .then((returnVal) => {
          resolve(returnVal);
        });
    });
  },
  getLoginDetails: (userDetails) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection("users")
        .findOne({ username: userDetails.username });
      if (user) {
        bcrypt.compare(userDetails.password, user.password).then((status) => {
          if (status) {
            response.user = user.username;
            response.status = true;
            console.log(response);
            resolve(response);
          } else {
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },
  editUser: (id) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection("users")
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              username: user.username,
              name: user.name,
              email: user.email,
              phone: user.phone,
            },
          }
        );
      resolve(user);
    });
  },
  deleteUser: (id) => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection("users")
        .deleteOne({ _id: objectId(id) });
      resolve(users);
    });
  },
};
