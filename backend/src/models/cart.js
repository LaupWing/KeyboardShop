const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products: [{
            productId:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
    }],
    orderCompleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart