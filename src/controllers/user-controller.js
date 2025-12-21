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
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            err:error.explanation,
            success:false
        })
        
    }
}

const signIn = async (req, res) =>{
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            message:"Done",
            data: response,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            err:error.explanation,
            success:false
        })
    }
}

const isAuthenticated = async(req, res)=>{
    try {
        const token = req.headers['x-access-token'];
        console.log(token);
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"user is authenticated and token is valid"
        })

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

const isAdmin=async (req, res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"user is authenticated and token is valid"
        })

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
    create,
    signIn,
    isAuthenticated,
    isAdmin
}