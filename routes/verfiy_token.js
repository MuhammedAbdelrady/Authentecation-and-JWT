const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{
    const token = req.header('Auth-Token')
    if(!token) return res.status(401).send('Acess Denied')
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user= verified 
        console.log(req.user)
        next()

    }catch(err){
        res.status(400).send('Invalid token')
    }

}

module.exports = verifyToken