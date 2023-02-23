const express = require("express")
const {Usermodel}= require("../models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/register", async (req,res)=>{
    const {email,password,name} = req.body
    try{
        bcrypt.hash(password,5,async(err,secure_password) =>{
            if(err){
                console.log(err);
            }
            else{
                const user = new Usermodel({email,password:secure_password,name})
                await user.save()
                res.status(201).send("Registered")
            }
        });
    }
    catch(err){
        res.send("Something went wrong!")
        console.log(err);
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body
    try{
       const user = await Usermodel.find({email})
       const hashed_pass  = user[0].password
       if(user.length>0)
       {
        bcrypt.compare(password, hashed_pass, (err, result)=>{
            if(result){
                const token = jwt.sign({userID:user[0]._id},"masai")
                res.status(201).send({"msg":"Login Successfull!","token":token})
            }
            else{
                res.send("wrong Credentials!")
            }
        });
       }
       else{
        res.send("rong Credentials!")
       }
    }
    catch(err){
        res.send("Something went wrong!")
        console.log(err);
    }
})

module.exports={
    userRouter
}