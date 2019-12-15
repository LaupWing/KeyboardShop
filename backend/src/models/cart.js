const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: {
        products:[{
            product:{
                productId:{
                    type: String,
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true
                },
            }
        }],
        orderCompleted: {
            type: Boolean,
            default: false,
            required: true
        }
    }
},{
    timestamps: true
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart