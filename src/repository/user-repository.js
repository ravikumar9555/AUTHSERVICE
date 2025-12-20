
const db = require('../models');  // import the whole db
const User = db.User;             // extract the User model
const {Role}= require('../models/index')
const ValidationError = require('../utils/Validation-error')
class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
        return user;
        } catch (error) {
           if(error.name="SequelizeUniqueConstraintError"){
            throw new ValidationError(error);
           }
            
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
            return user;
        } catch (error) {
            console.log('Something went wrong on repository layer');
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            })
            console.log(user, adminRole)
           return user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong on repository layer');
            throw error;
        }
    }
}
module.exports= UserRepository;