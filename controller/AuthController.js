const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')


exports.register=(req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashPass){
        if(err){
            res.json({error:err})
        }
        let user=new User({
            Name:req.body.Name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            birthdate:req.body.birthdate,
            age:req.body.age,
            password:hashPass,

        })
        user.save()
        .then(user=>{
            res.json({
                message:'User add successfully'
            })
        }).catch(error=>{
            res.json({
                message:error
            })
        })
    })
    
}

exports.Login=(req,res,next)=>{
    var username=req.body.username
    var password=req.body.password
    
    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user=>{
        console.log(user)
        if(user){
                bcrypt.compare(password,user.password,function(err,result){

                    if(err){
                        res.json({
                            error:err
                        })
                    }if(result){
                        let token=jwt.sign({name:user.name}, 'verySecretValue' ,{expiresIn:'1h'})
                        res.json({
                            message:'Lgin suucessfully',
                            token
                        })
                    }else{
                        res.json({
                            message:'Password dose not match'
                        })
                    }
                })
        }else{
            res.json({
                message:'No user found'
            })
        }
    })


    
}
