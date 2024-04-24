const { User } = require("../model/userModel");

let checkUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ username: username });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let userRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email is exist ??
      let check = await checkUsername(data.username);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your username is already in used, Plz try another username",
        });
      } else {
        const newUser = new User(data);
        const savedUser = await newUser.save();
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let userLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUsername(username);
      if (isExist) {
        // user already exists
        //compare password

        let user = await User.findOne({ username, password });
        if (user) {
          userData.errCode = 0;
          userData.errMessage = "Ok";
          delete user.password;
          userData.user = user;
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's not found";
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage =
          "Your's username is's exist in your system. Plz try other username!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email is exist ??
      let check = await checkUsername(data.username);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your username is already in used, Plz try another username",
        });
      } else {
        const newUser = new User(data);
        const savedUser = await newUser.save();
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await User.find();
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (err) {
      reject(e);
    }
  });
};

let getDetailUserById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        const user = await User.findById(inputId).populate("borrowBooks");
        resolve({
          errCode: 0,
          errMessage: "ok!",
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(data._id);
      await user.updateOne({ $set: data });

      resolve({
        errCode: 0,
        message: "Update User succeeds!",
      });
    } catch (err) {
      reject(e);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.findByIdAndDelete(id);

      resolve({
        errCode: 0,
        message: "Delete User succeeds!",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  createUser: createUser,
  getAllUser: getAllUser,
  getDetailUserById: getDetailUserById,
  editUser: editUser,
  deleteUser: deleteUser,
};
