const express = require('express')
const router = new express.Router()
w
router
    .get('/user', (req,res)=>{
        res.send('user home page')
    })


module.exports = router