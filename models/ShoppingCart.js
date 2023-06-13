const { Schema, model } = require("mongoose");

const ShoppingCardSchema = Schema({

    title:{
        type: String,
        required: true
    },

    image:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required:true
    },

    price : {
        type: Number,
        require: true
    },

    category : {
        type: String,
        require: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    

});

ShoppingCardSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
    
 })

module.exports = model('ShoppingCard', ShoppingCardSchema);