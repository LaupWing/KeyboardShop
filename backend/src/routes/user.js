const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')

router
    .post('/login', async(req,res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({user, token})
        }catch(e){
            res.status(e).json({
                message: e.message,
                type: 'error'
            })
        }
    })
    .get('/user', (req,res)=>{
        res.send('user home page')
    })
    .post('/user', async (req,res)=>{
        const newUser = new User(req.body)
        console.log(req.body)
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
    .patch('/user', async(req,res)=>{
        const updates = Object.keys(req.body)
        const isAllowed = ['name', 'email', 'password', 'age']
        const isValid = updates.every(update=>isAllowed.includes(update))
        if(!isValid){
            return res.status(400).json({error: 'Invalid field update'})
        }
        res.send(user)
    })
    
module.exports = router