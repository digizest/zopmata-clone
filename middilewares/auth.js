
// //protected route
// exports.isSignedin = expressJwt({
//     secret: process.env.SECRET,
//     userProperty: "auth"
// });


// //custom middlewares

// exports.isAuthenticated = (req,res,next) => {
//     let checker = req.profile && req.auth && req.profile._id == req.auth._id;
//     if(!checker){
//         return res.status(403).json({
//             error : "Access Denied"
//         })
//     }
//     next();
// }
// exports.isAdmin = (req, res, next) => {
//     if(req.profile.role === 0){
//         return res.status(403).json({
//             error : "YOU ARE NOT ADMIN"
//         });
//     }

//     next();
// };
// module.exports = {  }