const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECTION,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
// console.log('running')
// const User = mongoose.model('User',{
//     name:{
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: 'Laup Wing',
//     age: '24'
// })

// me.save().then(()=>{
//     console.log('saved', me)
// })
// .catch(e=>{
//     console.log(e, 'error')
// })