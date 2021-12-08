const express = require("express");

const {
  getAllProduct,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  createProductreview,
  getAllReviews,
  deleteReview,
  hello
} = require("../controllers/ProductController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const router = express.Router();

router.route("/reviews").get(getAllReviews).delete(deleteReview)

 router.route("/getAllProduct").get(isAuthenticatedUser, authorizedRoles("admin"), getAllProduct);

 router.route("/createProduct").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
 router.route("/:id").put(isAuthenticatedUser,authorizedRoles("admin"), updateProducts)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
   .get(getProductDetails)
 router.route("/createReview").post(isAuthenticatedUser, createProductreview);



module.exports = router;
