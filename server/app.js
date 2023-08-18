const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Allow requests from all origins (you can specify specific origins if needed)
dotenv.config({path:'./config.env'})
const PORT = process.env.PORT

const app= express();
// ... other server configurations and routes ...

require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
//const User = require('./model/userSchema');



//middleware

/*
const middleware = (req,res,next) =>{
    console.log(`middleware`);
    next(); 
}
*/



/*app.get('/',(req,res)=>{
    res.send(`hello home from server app.js`)
});
app.get('/about',middleware,(req,res)=>{
    res.send(`hello about from server`)
});*/
app.get('/contact',(req,res)=>{
    res.cookie("Test",'papa')
    res.send(`hello contact from server`)
});
app.get('/login',(req,res)=>{
    res.send(`hello login from server`)
});
app.get('/register',(req,res)=>{
    res.send(`hello signin from server`)
});
app.get('/signout',(req,res)=>{
    res.send(`hello signout from server`)
});

app.listen(PORT,()=>{
    console.log(`Server ronning at ${PORT}`)
})