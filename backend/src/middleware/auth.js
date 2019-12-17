const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next)=>{
    console.log('auth')
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token}) // tokens.token looks for a specific tokenin the tokens.token array
        req.token = token // save the token so that it could be used for the logout route
        req.user = user // Save the user to the server
        if(!user){
            throw new Error() // to trigger the catch
        }
        next()
    }catch(e){
        res.status(401).json({error: 'Please Authenticate'})
        
    }
}

module.exports = auth