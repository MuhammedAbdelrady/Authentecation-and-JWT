const route = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verfiy_token')

route.get('/',verifyToken,(req,res)=>{
    res.status(200).send(req.user)
})


module.exports = route