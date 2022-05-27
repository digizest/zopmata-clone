const verificationAuth = (req , res , next )=>{
    console.log("from auth verification middileware")
    next()
}

module.exports = { verificationAuth }