const userService = require("../services/userService");

let handleUserRegister = async (req, res) => {
  let message = await userService.userRegister(req.body);
  return res.status(200).json(message);
};

let handleUserLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.userLogin(username, password);
  // access_token:JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleCreateUser = async (req, res) => {
  let message = await userService.createUser(req.body);
  return res.status(200).json(message);
};

let handleGetAllUser = async (req, res) => {
  let message = await userService.getAllUser(req.body);
  return res.status(200).json(message);
};

let getDetailUserById = async (req, res) => {
  try {
    let infor = await userService.getDetailUserById(req.params.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleEditUser = async (req, res) => {
  let message = await userService.editUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
     console.log(req.params.id);
  if (!req.params._id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.params._id);
  return res.status(200).json(message);
};

module.exports = {
  handleUserRegister: handleUserRegister,
  handleUserLogin: handleUserLogin,
  handleCreateUser: handleCreateUser,
  handleGetAllUser: handleGetAllUser,
  getDetailUserById: getDetailUserById,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
