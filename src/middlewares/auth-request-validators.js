const validateUserAuth =(req, res, next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data: {},
            message: "Something went wrong",
            err: "Email or password missing in the signup request"
        })
    }
    next();
}

const validateAdminRequest= (req, res, next)=>{
    if(!req.query || !req.query.id){
        return res.status(400).json({
            success:false,
            data: {},
            message: "Something went wrong",
            err: "User ID Is not given"
        })
    }
    next();
    }


module.exports= { 
    validateUserAuth,
    validateAdminRequest
}