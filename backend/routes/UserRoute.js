const express = require("express")
const { registerUser, login, logout, forgotpassword, resetPassword,
    getUserDetails, updatePassword,updateProfile, getAllUser,singleUser, updateRole, deleteUser } = require("../controllers/UserController")
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/forgotPassword").post(forgotpassword)
router.route("/resetPassword/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/updatePassword").put(isAuthenticatedUser, updatePassword)
router.route("/updateProfile").put(isAuthenticatedUser, updateProfile)
router.route("/admin/getUsers").get(isAuthenticatedUser, getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, singleUser)
router.route("/admin/updateRole/:id").put(isAuthenticatedUser,updateRole)
router.route("/admin/delete/:id").delete(isAuthenticatedUser, deleteUser)






module.exports = router