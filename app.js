//Require libs
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const connect = require('./DB-Connect')

//connect to DB
connect()

//Import Routes
const RegRoute = require('./routes/auth')
const postRoute = require('./routes/posts')



//Middlewares
app.use(express.json())
//Routes middleware
app.use('/user/', RegRoute)
app.use('/post/', postRoute)


//Run server
app.listen(process.env.PORT, ()=> console.log('Phew, Server is running locally...') )

