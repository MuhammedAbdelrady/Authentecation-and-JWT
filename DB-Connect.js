const mongoose = require('mongoose')

const connection = async ()=>{
    try{
        const url = process.env.CONNECTION_STRING
        await mongoose.connect(url,{'useNewUrlParser':true})
        console.log('Connected to DB...')
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connection