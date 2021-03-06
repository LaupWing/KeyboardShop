const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
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

const Orders = mongoose.model('orders', ordersSchema)

module.exports = Orders