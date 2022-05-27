const dummymiddileware = (req , res , next )=>{
    console.log("from custum middileware")
    next()
}

module.exports = { dummymiddileware }