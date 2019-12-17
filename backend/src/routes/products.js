const express = require('express')
const router = new express.Router()

router
    .get('/products/all', (req,res)=>{
        res.send('all products')
    })
    .get('/products/all', (req,res)=>{
        res.send('all products')
    })


module.exports = router