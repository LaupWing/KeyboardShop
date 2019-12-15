const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
router
    .get('/user', (req,res)=>{
        res.send('user home page')
    })
    .post('/user', async (req,res)=>{
        const newUser = new User(req.body)
        try{
            await newUser.save()
            res.status(201).send(newUser)
        }
        catch(e){
            res
                .status(400)
                .send(e)
        }
    })
    
module.exports = router