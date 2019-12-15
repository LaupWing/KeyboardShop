const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    color:{
        type: String
    },
    stock:{
        type: Number,
        required: true
    },
    images:[{
        image:{
            name:{
                type: String,
                required: true
            },
            path:{
                type: String,
                required: true
            },
            position:{
                type: Number,
                required: true
            }
        }
    }]
})

const Product = mongoose.model('product', productSchema)

module.exports = Product