const mongoose = require('mongoose')
const validator = require('validator') // A validation package for validating email src: https://www.npmjs.com/package/validator
const bcrypt = require('bcrypt') // To crypt the raw password
const jwt = require('jsonwebtoken')
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
    },
    role:{
        type: String,
        required: true,
        default: 'basic',
        enum: ['basic', 'admin']
    },
    // I have made a tokens array instead of a token object because it allows the user to login on multiple devices
    // Otherwis if the user didnt logout he cant login on another device
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

})


// Whats the diffrence between methods and statics
// The main diffrrence is that the statics method lifes on the model of mongoose
// And the method methods lives on the instance of the model. On the instance you can acces the user info (this, which is the userinfo itself)

userSchema.methods.toJSON = function(){ // behind the scenes at res.send the toJSON method is getting called
    // Thats why everytime the userobjec got send to the client this method will be called
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save() // saving the updated tokens array to the database
    return token // returning the logged in token
}

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

// Method that runs before the user is saved to the database
userSchema.pre('save', async function(next){
    console.log('------------------------before saving to db------------------------')
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8) // The 8 is the amount of hashings
    }
    next() // This methods needs to be called aftere the function is finished, otherwise it thinks the function is not ending   
})

const User = mongoose.model('User', userSchema)

module.exports = User