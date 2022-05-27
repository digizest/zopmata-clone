const user = [{ name : "asdcw"},{ name : "qweer"},{ name : "abcd"}]

//controller 1
const getListOfUser = (req , res)=>{
    return res.status(200).send(user)
}

module.exports = { getListOfUser }