const mongoose = require('mongoose')
const validator = require('validator') // A validation package for validating email src: https://www.npmjs.com/package/validator

// Schema.________________________________
// ---------------------------------------
// Schema is set to define the structure of the individual data stored in the users database
// Questions you can ask with buiding an schema are
// * How does the data look like?
// * What kind of properties does it got?


// Models.________________________________
// ---------------------------------------
// Models are the operations of the specific data/schema
// Questions you can ask related to the models are
// * Delete this item
// * Does this item exist?
// * Basically crud operations (Create, Read, Update and delete)

// With mongoose you can define many properties, Each property with its own specifications and requirements
// Requirements could be:
// * Type of data
// * Is it required
// * Should the string be trimmed
// * Validate (a custom validation function)
// * AND MUCH MORE (See comments behind the specifications for more explaination)

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