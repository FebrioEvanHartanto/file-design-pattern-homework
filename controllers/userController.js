const UserService = require("../services/userService.js")

class UserController {

  static findAllUsers = async (req, res, next) => {
    try {

      const users = await UserService.findAllUsers(req.query);

      res.status(200).json(users);

    } catch (err) {
        next(err);
    }
  }
  static findUserById = async (req, res, next) => {
    try {

      const user = await UserService.findUserById(req.params.id);

      res.status(200).json({
        data: user
      });

    } catch (err) {
        next(err);
    }
  }
  static createUser = async (req, res, next) => {
    try {

      await UserService.createUser(req.body);

      res.status(201).json({message : "User Successfully Created!"})

    } catch (err) {
        next(err);
    }
  }
  static updateUser = async (req, res, next) => {
    try {

      const params = {
        id: req.params.id,
        body: req.body
      }

      const user = await UserService.updateUser(params);

      res.status(200).json({
        message : "User Successfully Updated!, Here is the new user data: ", 
        data : {
          id: user.id,
          email: user.email,
          gender: user.gender,
          user: user.role
        }
    })

    } catch (err) {
        next(err);
    }
  }
  static deleteUser = async (req, res, next) => {
    try {

      await UserService.deleteUser(req.params.id);
      
      res.status(200).json({message: "User has been successfully deleted!"});

    } catch (err) {
        next(err);
    }
  }

}

module.exports = UserController;