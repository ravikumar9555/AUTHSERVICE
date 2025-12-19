const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig')
class userService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async create(data){
        try {
                    const user = await this.UserRepository.create(data);
                return user;
                } catch (error) {
                    console.log('Something went wrong on repository layer');
                    throw error;
                    
                }
    }

    createToken(user){
    try {
        const result = jwt.sign(user,JWT_KEY ,{expiresIn: '1h'} );
        return result;
    } catch (error) {
        console.log('Something went wrong in token creation');
        throw error;
    }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong in token validation');
        throw error;
        }
    }
}

module.exports = userService;