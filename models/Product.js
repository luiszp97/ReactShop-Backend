const { Schema, model } = require("mongoose");

const ProductSchema = Schema({

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
        require: false
    },

    category : {
        type: String,
        require: false
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    

});

ProductSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
    
 })

module.exports = model('Product', ProductSchema);
