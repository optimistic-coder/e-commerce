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
  getAdminProducts
} = require("../controllers/ProductController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const router = express.Router();
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);
router.route("/reviews").get(getAllReviews).delete(deleteReview)

 router.route("/products").get( getAllProduct);

 router.route("/admin/product/new").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct);
 router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"), updateProducts)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails);
 router.route("/createReview").post(isAuthenticatedUser, createProductreview);



module.exports = router;
