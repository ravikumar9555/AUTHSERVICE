const UserRepository = require('../repository/user-repository');

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
}

module.exports = userService;