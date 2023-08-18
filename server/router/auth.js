const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
require('../db/conn');
const User=require("../model/userSchema");
router.get('/',(req,res)=>{
    res.send(`hello home from server router.js`)
});
/*
router.post('/register',(req,res)=>{
    const{name,email,phone,pwd,cpwd}=req.body;
    if(! name || ! email || ! phone || ! pwd || ! cpwd){
        return res.status(422).json({error:"Plz fill appropiate"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:"Email already there"});
        }
        const user=new User({name,email,phone,pwd,cpwd})
        user.save().then(()=>{
            res.status(201).json({mesage:"User register successful"});
        }).catch((err)=> res.status(500).json({error:"Failed to register"}));
    }).catch(err=>{console.log(err);});

});*/
router.post('/register',async (req,res)=>{
    console.log(req.body);
    const{name,email,phone,pwd,cpwd}=req.body;
    if(! name || ! email || ! phone || ! pwd || ! cpwd){
        return res.status(422).json({error:"Plz fill appropiate"});
    }

    try{
      
    const userExist =   await  User.findOne({email:email})

    if(userExist){
        return res.status(422).json({error:"Email already there"});
    }else if(pwd != cpwd ){
        return res.status(422).json({error:"password not found"});
    }else{
        const user=new User({name,email,phone,pwd,cpwd});

    const userRegister = await user.save();

    if(userRegister){
        res.status(201).json({mesage:"User register successful"});
    }else{
        res.status(500).json({error:"Failed to register"});

    }
    }

    
     
    }catch(err){
        console.log(err);
    }

});

//login Route


router.post('/login', async (req,res)=>{

    let token;
    //console.log(req.body);
    //res.json({message:"awesome"});

    try{
        const {email , pwd}=req.body;
        if(!email || !pwd){
            return res.status(400).json({error:"Invalid data provided"})
        }

        const userLogin=await User.findOne({ email:email });

        //console.log(userLogin);
        
        if(userLogin){
            const isMatch = await bcrypt.compare(pwd,userLogin.pwd);
            token= await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires : new Date(Date.now()+25892000000),
                httpOnly:true
            });

        if(!isMatch){
            res.status(400).json({error:"not successful"});
        }else{

            res.json({message:"User login successful"});
        }
        }else{
            res.status(400).json({error:"not successful"});
        }


    }catch(err){
        console.log(err);
    }
});

router.get('/about', authenticate ,(req,res)=>{
    console.log(`Helo about`);
    res.send(`hello about from server`)
})

module.exports=router;