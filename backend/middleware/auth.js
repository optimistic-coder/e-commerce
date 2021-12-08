const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const ErrorHander = require("../utils/errorhander");
const CatchAsyncErros = require("./CatchAsyncErros");

exports.isAuthenticatedUser = CatchAsyncErros(async(req, res, next) => {
    const { token } = req.cookies
  
    if (!token) {
      return  next(new ErrorHander("Please Login to access this resource",401))
    }
    
    const decode = jwt.verify(token, "scret")
    console.log(decode)
    req.user = await User.findById(decode.id)

    next()


})

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    console.log("hhhh",req.user)
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander("not authorized",403)
      )
    }
    next()
  }
}