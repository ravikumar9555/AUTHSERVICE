const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig')
const bcrypt = require('bcrypt');
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

    async signIn(email, plainPassword){
        try {
            //step1 fetch the user using the email
            const user = await this.UserRepository.getUserByEmail(email);
            //step2 compare incoming plainPassword with stored encrypted password
            const passwordMatch= this.checkPassword(plainPassword, user.password);
            if(!passwordMatch){
                console.log('password not matched');
                throw {error:"Incorrect password"};
            }

            const newJwt= this.createToken({email:user.email ,id:user.id});
            return newJwt;
        } catch (error) {
            console.log('Something went wrong in the signin process');
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

    checkPassword(userInputPlainPassword , encryptedpassword){
        try { 
            return bcrypt.compareSync(userInputPlainPassword, encryptedpassword);
            
        } catch (error) {
            console.log('Something went wrong in password comparison');
        throw error;
        }
    }
}

module.exports = userService;