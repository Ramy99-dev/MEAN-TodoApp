let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Todo = require('./models/todo')
const bodyParser = require('body-parser');


const dbURI = 'mongodb+srv://rami:test123@cluster0.oq6ol.mongodb.net/todoDB?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology: true })
.then((result)=>{
    app.listen(5050,()=>{
        console.log("Listening to 5050 !");
    });
    console.log('connect to DB')
})
.catch((err)=>console.log(err))

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });



app.post('/add-todo',(req,res)=>{

    console.log(req.body)
   const todo = new Todo(req.body)
   todo.save()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
       console.log(err)
   })
})

app.get('/get-alltodo',(req , res)=>{
    Todo.find()
    .then((result)=>{
        res.json(result)
    })
})

app.get('/get-todo/:id',(req,res)=>{
    Todo.findById(req.params.id)
    .then((result)=>{
        res.json(result)
    });
})

app.delete('/delete-todo/:id',(req,res)=>{
    console.log(req.params.id);
    Todo.findOneAndDelete({_id:req.params.id})
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{console.log(err)});
    
    
})
app.put('/update-todo/:id',(req,res)=>{
    
  var  todo =  Todo.findOneAndUpdate(req.params.id,req.body)
  .then((result)=>res.send(result));
 
 // res.send(todo);
      
      
  
})