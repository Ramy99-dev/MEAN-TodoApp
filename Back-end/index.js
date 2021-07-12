require('dotenv').config();
let express = require('express');

const app = express();
//Route 
const todoRoutes = require('./routes/todoRoutes')
const userRoutes = require('./routes/userRoutes')

const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
app.use(cookieParser())
const cors = require('cors');


app.use( express.urlencoded({ extended: true }) )
app.use(cors({ origin:true, credentials:true }));
//Connect to DB
const dbURI = process.env.DATABASE
mongoose.connect(dbURI,{useNewUrlParser:true ,useUnifiedTopology: true })
.then((result)=>{
    app.listen(5050,()=>{
        console.log("Listening to 5050 !");
    });
    console.log('connect to DB')
})
.catch((err)=>console.log(err))


app.use(express.urlencoded({extended:true}));
app.all("/*", function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
//Routes
app.use(todoRoutes)
app.use(userRoutes)













  