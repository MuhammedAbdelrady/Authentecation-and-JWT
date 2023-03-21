const route = require('express').Router();
const User = require('../models/User')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')

route.post('/register', async(req,res)=>{
    //Validate inputs
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the user is already in DB
    const emailExist = await User.findOne({ email: req.body.email})
    if(emailExist) return res.status(400).send('Email is already exist!!')
    
    //Hash the password
    const salty = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password , salty)

    //Create new user
    const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    })
    //Save new user
    try {
        const savedUser = await newUser.save()
        res.status(200).send({name: savedUser._id})
    }catch(err){    //catch errors
        res.status(400).send(err)
    }
})

route.post('/login' , async(req,res)=>{
    //Check if there is any problem about user inputs
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //Check email
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email not found')

    //Check password
    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if(!validPassword) return res.status(400).send('Password is incorrect')

    //Create token for the user
    const token = jwt.sign({_id:user._id} , process.env.TOKEN_SECRET)

    //Everything ok
    res.header('Auth-Token' , token).status(200).send(token)

})
module.exports = route