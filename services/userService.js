const UserRepository = require("../repositories/userRepository.js");
const {Op} = require("sequelize");
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

class UserService {

  static findAllUsers = async (params) => {
    try {

      let {email, gender, role, limit, page} = params;

      let filterOptions = {
        where : {}
      }

      let emailFilter = {};
      let genderFilter = {};
      let roleFilter = {};

      if(email) {
        emailFilter = {
          email : {
            [Op.iLike]: `%${email}%`
          }
        }
      }

      if(gender) {
        genderFilter = {
          gender: {
            [Op.iLike]: `${gender}%` //
          }
        }
      }

      if(role) {
        roleFilter = {
          role: {
            [Op.iLike]: `${role}`
          }
        }
      }

      filterOptions.where = {
        ...emailFilter,
        ...genderFilter,
        ...roleFilter
      }

      limit = limit || DEFAULT_LIMIT;
      page = page || DEFAULT_PAGE;
      const offset = (page - 1 ) * limit;

      filterOptions.limit = limit;
      filterOptions.offset = offset;

      const users = await UserRepository.findAllUsers(filterOptions)

      return users;

    } catch (err) {
        throw err;
    }
  }
  static findUserById = async (id) => {
    try {

      const filterOptions = {
        where: {
          id
        }
      }

      const user = await UserRepository.findUserById(filterOptions);

      if(!user){
          throw {name: "UserNotFound", message: "User Not Found!"}
      } else {
          return user;
      }

    } catch (err) {
        throw err;
    }
  }
  static createUser = async (params) => {
    try {

      const user = await UserRepository.createUser(params);
      return user;

    } catch (err) {
        throw err;
    }
  }
  static updateUser = async (params) => {
    try {
      const {id,body} = params;
      const user = await UserRepository.updateUser(id, body);
     

    } catch (err) {
        throw err;
    }
  }
  static deleteUser = async (id) => {
    try {

      await UserRepository.deleteUser(id);

    } catch (err) {
        throw err;
    }
  }
}

module.exports = UserService;