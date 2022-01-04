const ErrorHander = require("../utils/errorhander");
const CatchAsyncErros = require("../middleware/CatchAsyncErros");
const User = require("../model/UserModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto")
exports.registerUser = CatchAsyncErros(async (req, res, next) => {
    const { name, email, password,role } = req.body
    
   const user = await User.create({
       name,
       email,
       role,
       password,
        avatar: {
            public_id: "this id",
            url:"url"
        }
   })
     sendToken(user,200,res)
})

exports.login = CatchAsyncErros(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHander("Please Enter email password",4000))
    }

    
    const user = await User.findOne({ email }).select("+password")
    
    if (!user) {
        return next(new ErrorHandler("User not found",404))
    }

    const isPasswordMatch = user.comparePassword(password)

     if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid password",400))
    }

 sendToken(user,200,res)

})

exports.logout = CatchAsyncErros(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.json({
        success: true,
        message:"Loggged Out"
    })
})

exports.forgotpassword = CatchAsyncErros(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHander("User not found",404))
    }
    const resetToken = user.getResetPasswordToken()
    await user.save({
        validateBeforeSave:false
    })
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    const message = `youer password reset link : - ${resetPasswordUrl}`

    try {
        // await sendEmail({
        //     email: user.email,
        //     subject:"Forgot password",
        //     message
        // })
        res.json({
            success: true,
            link:message
        })
     } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({
                validateBeforeSave:false
        })
        console.log("EEEEEE",err)
        return next(new ErrorHander("",500))
    }
})

exports.resetPassword = CatchAsyncErros(async (req, res, next) => {
    resetPasswordToken =   crypto
    .createHash("sha256")
    .update(req.params.token)
        .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    if (!user) {
        return next(new ErrorHander("Token invalid",400))
    }
    if (req.body.password === req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match",400))
    }
    user.password = req.body.password
      user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    user.save()
    sendToken(user,200,res)

})

exports.getUserDetails = CatchAsyncErros(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        return next(new ErrorHander("User not found ",404))
    }
    res.json({
        success: true,
        user
    })
})

exports.updatePassword = CatchAsyncErros(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = CatchAsyncErros(async (req, res, next) => {
    var newuserData = {
        name: req.body.name,
        email:req.body.email

    }
    const user = await User.findByIdAndUpdate(req.user.id,newuserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
            })
      res.status(200).json({
          success: true,
          user
  });
})

exports.getAllUser = CatchAsyncErros(async (req, res, next) => {
    
    const users = await User.find()
    if (!users) {
        return next(new ErrorHander("Something went wrong"))
    }
    res.json({
        success: true,
        users
    })

})

exports.singleUser = CatchAsyncErros(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHander("user not found"))
    }
    res.json({
        success: true,
        user
    })
})

exports.updateRole = CatchAsyncErros(async (req, res, next) => {
    var newuserData = {
        name: req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newuserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
            })
      res.status(200).json({
          success: true,
          user
  });
})

exports.deleteUser = CatchAsyncErros(async (req, res, next) => {


     await User.findByIdAndDelete(req.params.id)
      res.status(200).json({
          success: true,
          message:"User deleted"
  });
})