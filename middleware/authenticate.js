const jwt=require('jsonwebtoken')
const UserModel = require('../models/userModel')

exports.authenticate=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(token, 'verySecretValue')

        // const user =  UserModel.findById(decode.id);
        req.user=decode
        console.log(decode)
        next()
    }catch(error){
        res.json({
            message:'Authentication Failed!'
        })
        
    }
    console.log("token")
}
