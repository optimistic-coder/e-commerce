const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/OrderController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth")
const express = require("express")
const router = express.Router();
router.route("/orders/me").get(isAuthenticatedUser,myOrders)

router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/order/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser,getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser,updateOrder)
  .delete(isAuthenticatedUser,deleteOrder);

module.exports = router