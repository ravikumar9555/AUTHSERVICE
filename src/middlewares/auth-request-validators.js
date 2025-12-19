const validateUserSignup =(req, res, next)=>{
    if(req.body.email || req.body.password){
        return res.status(500).json({
            success:false,
            data: {},
            message: "Something went wrong",
            err: "Email or password missing in the signup request"
        })
    }
    next();
}

module.exports={
    validateUserSignup
}