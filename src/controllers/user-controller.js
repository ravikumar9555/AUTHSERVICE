const UserService= require('../services/user-service');

const userService = new UserService();
const create  = async (req, res) =>{
    try {
        console.log(req.body.email);
        console.log(req.body.password);
        const response  = await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            data:response,
            err:{},
            message:"Successfully created a user",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            err:error,
            success:false
        })
        
    }
}

module.exports={
    create
}