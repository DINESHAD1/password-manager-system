const mongoose = require('mongoose');

const PasswordManager = mongoose.Schema({
    // userId:{
    //     type : String,
    //     require : true
    // },
    websitename :{
        type : String,
        require: true
    },
    username:{
        type:String,
        require:true
    },
    encryptedtext:{
        type:String,
        require:true
    },
    key:{
        type:String,
        require:true
    },
    data:{
        type:Date,
        default : Date.now
    }
})

module.exports = mongoose.model('PasswordManager',PasswordManager)