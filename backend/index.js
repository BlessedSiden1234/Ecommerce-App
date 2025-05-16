const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const router = require('./router/route')
const router2 = require('./router/route2')
const router3 = require('./router/route3')
const router4 = require('./router/route4')
const connectDB = require('./db/connect')
const asyncWrapperHandler = require('./middleware/asyncWrap')
const auth = require('./middleware/authenticate')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(asyncWrapperHandler);
app.use('/api/products', router)
app.use('/api/users', router2)
app.use('/api/orders', auth, router3)
app.use('/api/update/', auth, router4 )

app.get('/api/keys/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})


const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is running at Port ${port}`)
        })
    }
    catch(err){
        console.log(err)
    }
}

start()