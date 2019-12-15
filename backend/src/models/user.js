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

const userSchema = new mongoose.Schema({
    name: {
        type: String, // What type of data it is
        required: true, // Is this property a must
        trim: true // Trim the data (delete the white spaces)
    },
    email:{
        type: String,
        required: true,
        unique: true, // Is there no other email like this
        validate(value){ // Custom validation function
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password cannot contain password!')
            }
        }
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User