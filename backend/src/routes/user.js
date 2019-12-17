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
            res.status(e).json({
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
    .post('/user/cart',auth, async (req,res)=>{
        const products = [req.body]

        const cart = new Cart({
            products,
            owner: req.user._id
        })
        try{
            await cart.save()
            res.status(201).send(cart)
        }catch(e){
            console.log(e)
            res.status(400).send(e.message)
        }
    })
    .post('/user', async (req,res)=>{
        const newUser = new User(req.body)
        try{
            await newUser.save()
            const token = await newUser.generateAuthToken()
            res.status(201).send({user: newUser, token})
        }
        catch(e){
            console.log(e)
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
    .delete('/user', auth, async(req,res)=>{
        try{
            await req.user.remove() // this is the same as user.findByIdAndDelete
            res.send(req.user)
        }catch(e){
            res.status(500).send(e.message)
        }
    })
    .delete('/user/:id', auth,grantAcces('deleteAny', 'profile'), async(req,res)=>{
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
                type: 'succes',
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