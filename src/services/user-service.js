const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig')
const bcrypt = require('bcrypt');
class userService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
                    const user = await this.userRepository.create(data);
                return user;
                } catch (error) {
                   {
                    throw error;
                   }
                    console.log('Something went wrong in the signin process');
                    throw error;
                    
                }
    }

    async signIn(email, plainPassword) {
  try {
    // Step 1: fetch user by email
    const user = await this.userRepository.getUserByEmail(email);

    // Step 2: compare passwords
    const passwordMatch = this.checkPassword(
      plainPassword,
      user.password
    );

    if (!passwordMatch) {
      console.log("password not matched");

      // ✅ THROW STRUCTURED ERROR
      throw {
        statusCode: 401,
        message: "Incorrect password",
      };
    }

    // Step 3: create JWT
    const newJwt = this.createToken({
      email: user.email,
      id: user.id,
    });

    return newJwt;

  } catch (error) {
    // ✅ FIXED COMPARISON
    if (error.name === "AttributeNotFound") {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    console.log("Something went wrong in the signin process");

    // ✅ ALWAYS THROW STRUCTURED ERROR
    throw {
      statusCode: error.statusCode || 500,
      message: error.message || "Signin failed",
    };
  }
}

    async isAuthenticated(token){
        try {
            const response= this.verifyToken(token);
            if(!response){
                throw {error:"Invalid Token"};
            }
            const user  =await this.userRepository.getById(response.id);
            if(!user){
                throw {error:"No user with the corresponding token exits"};
            }
            return user.id;
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

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
        console.log('Something went wrong in password comparison');
        throw error;
        }
    }
}

module.exports = userService;