require('dotenv').config();
const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

const addTodo = (req ,res )=>{
    console.log(process.env.USER)
    const todo = new Todo({
        act:req.body.act,
        user:process.env.USER
    })
    todo.save()
    .then((result)=>{
       res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getTodo = (req ,res)=>{
    Todo.find({user:process.env.USER})
    .then((result)=>{
        console.log(result)
        let data = {
            todo:result,
            user:process.env.USER
        }
        res.json(data)
    })
}

const deleteTodo = (req, res)=>{
    console.log(req.params.id);
    Todo.findOneAndDelete({_id:req.params.id})
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{console.log(err)});
}

function authorization(req,res,next)
{
     console.log('cookie :')
      console.log(req.body.cookieValue)
      jwt.verify(req.body.cookieValue,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err)
        return res.sendStatus(403)
        process.env.USER = user
        console.log(process.env.USER)
      
      })
      next();
      
}

module.exports  = {
    addTodo,
    getTodo,
    deleteTodo,
    authorization
}