const mongoose = require('mongoose');

const RegisterUser = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email :{
        type : String,
        unique:true,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    data:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model('RegisterUser',RegisterUser)