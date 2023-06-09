const { Schema, model } = require("mongoose");

const UserSchema = Schema({

    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true 
    },

    password:{
        type: String,
        required:true
    },

    rol : {
        type: 'user' | 'seller',
        require: false
    }

});

module.exports = model('User', UserSchema);
