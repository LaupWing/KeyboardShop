const express = require('express')
const router = new express.Router()

router
    .get('/all', (req,res)=>{
        res.send('all products')
    })


module.exports = router