const express = require("express")
const { registerUser, login, logout, forgotpassword, resetPassword,
    getUserDetails, updatePassword,updateProfile, getAllUser,singleUser, updateRole, deleteUser } = require("../controllers/UserController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotpassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route("/admin/users").get(isAuthenticatedUser, getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, singleUser)
    .put(isAuthenticatedUser, updateRole)
.delete(isAuthenticatedUser, deleteUser)






module.exports = router