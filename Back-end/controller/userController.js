require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = (req,res)=>{
    let user = new User(req.body);
  
    user.save()
    .then((result)=>{
        console.log("User registred")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const login = (req,res)=>{
    res.setHeader("Content-Type", "application/json"); 
    console.log(req.body.username)
    User.findOne({username : req.body.username})
    .then((result)=>{
           if(result == null)
           {
             let msg = {
                 message : "User not found"
                }
             res.json(msg)
           }
           else if(result.username == req.body.username)
           {
               if(result.password == req.body.password)
               {
                   let token = jwt.sign(req.body.username , process.env.ACCESS_TOKEN)
                   res.json({"token":token})
               }
               else
               {
                let msg = {
                    message : "Incorrect password"
                   }
                res.json(msg)
               }
           }
          
       }
    )
    .catch((err)=>{console.log(err)})
}

module.exports = {
    register,
    login
}