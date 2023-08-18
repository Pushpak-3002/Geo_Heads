const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log(`connection made`);
}).catch((err)=>{
    console.log(`Not made`);
})