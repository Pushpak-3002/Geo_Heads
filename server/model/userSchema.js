const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    email :{
        type : String,
        required :true
    },
    phone :{
        type : Number,
        required :true
    },
    pwd :{
        type : String,
        required :true
    },
    cpwd :{
        type : String,
        required :true
    },
    tokens:[
        {
            token:{
                type : String,
                required :true
            }
        }
    ]
    
})


userSchema.pre('save', async function(next){
    if(this.isModified('pwd')){
        this.pwd = await bcrypt.hash(this.pwd,12);
        this.cpwd =await bcrypt.hash(this.cpwd,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',userSchema);
module.exports= User;