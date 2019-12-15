const express = require('express')
require('./db/mongoose.js') // By only requiring the file it will start the functions within this file, to start the mongoose database.
const app = express()
const port = 3030
const userRoutes = require('./routes/user.js')
const productRoutes = require('./routes/products.js')

app
    .use(express.json()) // Use this to parse incoming data to an normal javascript Object aka JSON file
    .use(userRoutes) // By using the routes we can go to the diffrent routes specified in the corresponding files 
    .use(productRoutes)
    .listen(port,()=>console.log(`Server is listening to port ${port}`))
