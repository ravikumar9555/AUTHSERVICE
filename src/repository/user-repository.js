
const db = require('../models');  // import the whole db
const User = db.User;             // extract the User model
const {Role}= require('../models/index');
const ClientError = require('../utils/clientt-error');
const ValidationError = require('../utils/Validation-error')
const {StatusCodes}= require('http-status-codes')
class UserRepository{

    async create(data) {
  try {
    // 1️⃣ Create user
    const user = await User.create(data);

    // 2️⃣ Find CUSTOMER role
    const customerRole = await Role.findOne({
      where: { name: "CUSTOMER" },
    });

    if (!customerRole) {
      throw new Error("CUSTOMER role not found");
    }

    // 3️⃣ Attach role to user
    await user.addRole(customerRole);

    return user;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new ValidationError(error);
    }
    throw error;
  }
}


    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id: userId
                }
            });
        return true;
        } catch (error) {
            console.log('Something went wrong on repository layer');
            throw error;
            
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email' ,'id']
            });

        return user;
        } catch (error) {
            console.log('Something went wrong on repository layer');
            throw error;
            
        }
    
    }

    async getUserByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            if(!user){
                   throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Please check the email, as there is no record of the email ',
                    StatusCodes.NOT_FOUND
                   )
            }
            console.log(user);
            return user;
        } catch (error) {
            console.log('Something went wrong on repository layer');
            throw error;
        }
    }

    async isAdmin(userId) {
  try {
    const user = await User.findByPk(userId);

    if(!user){
                   throw new ClientError(
                    'UserNotFound',
                    'Invalid id sent in the request',
                    'Please check the id, as there is no record of the id with user ',
                    StatusCodes.NOT_FOUND
                   )
            }
    const adminRole = await Role.findOne({
      where: { name: "ADMIN" },
    });

    if (!adminRole) {
      throw new Error("ADMIN role not found");
    }


    const isAdmin = await user.hasRole(adminRole);

    console.log("IS ADMIN 👉", isAdmin);

    return isAdmin ? "ADMIN" : "CUSTOMER";
  } catch (error) {
    console.log("Something went wrong on repository layer");
    throw error;
  }
}

}
module.exports= UserRepository;