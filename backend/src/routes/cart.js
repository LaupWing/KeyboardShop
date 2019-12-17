const express = require('express')
const router = new express.Router()
const Cart = require('../models/cart')
const auth = require('../middleware/auth')

router
    .get('/cart',auth, async(req,res)=>{
        try{
            const cart = await Cart.findOne({owner: req.user._id})
            // await req.user.populate('cart').execPopulate()
            // res.json(req.user.cart)
            res.json(cart)
        }catch(e){
            res.json(e)
        }
    })
    .post('/cart',auth, async (req,res)=>{
        const products = [req.body]
        const findCart = await Cart.findOne({owner: req.user._id})
        if(findCart||req.cart){
            return res.json({
                type: 'warning',
                message: 'Cart already exists'
            })
        }
        const cart = new Cart({
            products,
            owner: req.user._id
        })
        try{
            await cart.save()
            req.cart = cart
            res.status(201).send(cart)
        }catch(e){
            res.status(400).send(e.message)
        }
    })
    .patch('/cart', auth, async (req,res)=>{
        if(!req.cart){
            const cart = await Cart.findOne({owner: req.user._id})
            cart.products = cart.products.concat({
                ...req.body
            })
            cart.save()
            res.json(cart)
        }else{
            req.cart.products = req.cart.products.concat({...req.body})
            req.cart.save()
            res.json(req.cart)    
        }
    })

module.exports = router