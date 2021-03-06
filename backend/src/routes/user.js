const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Cart = require('../models/cart')
const auth = require('../middleware/auth')
const grantAcces = require('../roles/grantAcces')

router
    .post('/login', async(req,res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({user, token})
        }catch(e){
            res.status(500).json({
                message: e.message,
                type: 'error'
            })
        }
    })
    .get('/user',auth, (req,res)=>{
        res.json(req.user)
    })
    .get('/users', auth, grantAcces('readAny', 'profile'), async (req,res)=>{
        const users = await User.find({})
        res.json(users)
    })
    .post('/user', async (req,res)=>{
        if(Object.keys(req.body).includes('role')){
            return res.status(400).json({
                type: 'error',
                message: 'You cant set the user role'
            })
        }
        console.log(req.body)
        const newUser = new User(req.body)
        console.log(newUser)
        try{
            await newUser.save()
            const token = await newUser.generateAuthToken()
            res.status(201).send({user: newUser, token})
        }
        catch(e){
            res
                .status(400)
                .send(e.message)
        }
    })
    .post('/user/logoutAll', auth, async(req,res)=>{
        try{
            req.user.tokens = []
            req.user.save()
            res.send()
        }catch(e){
            res.status(500).send(e.message)
        }
    })
    .post('/user/logout', auth, async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(token=>token.token!==req.token)
            await req.user.save()
            res.send()
        }catch(e){
            res.status(500).send(e.message)
        }
    })
    .patch('/user', auth, async(req,res)=>{
        const updates = Object.keys(req.body)
        const isAllowed = ['name', 'email', 'password', 'age']
        const isValid = updates.every(update=>isAllowed.includes(update))
        if(!isValid){
            return res.status(400).json({error: 'Invalid field update'})
        }
        try{
            updates.forEach(update=>req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
        }catch(e){
            res.status(400).send()
        }
        res.send(user)
    })
    .patch('/user/:id', auth, async(req,res)=>{
        const updates = Object.keys(req.body)
        const updatesVal = Object.values(req.body)
        const isAllowed = ['role']
        const isAllowedVal = ['basic', 'admin']
        const isValid = updates.every(update=>isAllowed.includes(update))
        const isValidVal = updatesVal.every(update=>isAllowedVal.includes(update))
        
        if(!isValid||!isValidVal){
            return res.status(400).json({error: 'Invalid field update'})
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

            if(!user){
                return res.status(404).json({
                    type: 'error',
                    message: 'User not found'
                })
            }
            res.json(user)
        }catch(e){
            res.status(400).json({
                type: 'error',
                message: e.message
            })
        }
    })
    .delete('/user', auth, grantAcces('deleteOwn', 'profile'), async(req,res)=>{
        try{
            await req.user.remove() // this is the same as user.findByIdAndDelete
            res.send(req.user)
        }catch(e){
            res.status(500).send(e.message)
        }
    })
    .delete('/user/:id', auth, grantAcces('deleteAny', 'profile'), async(req,res)=>{
        const id = req.params.id
        try{
            const user = await User.findByIdAndDelete(id)
            if(!user){
                res.json({
                    type: 'error',
                    message: 'Cant find this user'
                })
            }
            res.json({
                type: 'deleted',
                message: 'User is succesfully deleted',
                data:user
            })
        }catch(e){
            res.status(500).json({
                type: 'error',
                message: 'Cannot find the user with this id'
            })
        }
    })

module.exports = router