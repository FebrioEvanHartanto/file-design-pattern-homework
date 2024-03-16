const {User} = require("../models")

class UserRepository {

  static findAllUsers = async (params) => {
    try {

      const users = await User.findAll(params)
      return users;

    } catch (err) {
        throw err;
    }
  }
  static findUserById = async (params) => {
    try {

    const user = await User.findOne(params)

    return user;

    } catch (err) {
        throw err;
    }
  }
  static createUser = async (params) => {
    try {

      const user = await User.create(params, {
        returning: true
      })

      return user;

    } catch (err) {
        throw err;
    }
  }
  static updateUser = async (id, body) => {
    try {
      
      const user = await User.findOne({
        where: {
          id
        }
      })
    
    if(!user) {
        throw {name: "UserNotFound!", message: "User Not Found!"}
    } else {
        await user.update(body);
    }
    return user;

    } catch (err) {
        throw err;
    }
  }
  static deleteUser = async (id) => {
    try {

      const user = await User.findOne({
        where: {
          id
        }
      })

      if(!user){
          throw {name: "UserNotFound!", message: "User Not Found!"}
      } else {
          await user.destroy(id); 
      }

    } catch (err) {
        throw err;
    }
  }
}

module.exports = UserRepository;