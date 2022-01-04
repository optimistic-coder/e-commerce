const Product = require("../model/productModel");
const ErrorHander = require("../utils/errorhander");
const CatchAsyncErros = require("../middleware/CatchAsyncErros");
const ApiFeatures = require("../utils/apifeatures");
//create produc tt
exports.createProduct = CatchAsyncErros(async (req, res) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body);
  if (product) {
    res.json({
      success: true,
      product,
    });
  } else {
    
        next(new ErrorHander("Something went wrong..",500))

  }
});
// Get All Product (Admin)
exports.getAdminProducts = CatchAsyncErros(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
// //get all products
exports.getAllProduct = CatchAsyncErros(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature =await new ApiFeatures( Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);


  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });

});


//update product
exports.updateProducts = CatchAsyncErros(
  async(req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    res.json({
      success:false
    })
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify:false
    })
    if (product) {
      res.json({
        success: true,
        product
      })
    } else {
             next(new ErrorHander("Product not found",404))

    }
  }
}
)

//delete product
exports.deleteProduct = CatchAsyncErros(async (req,res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
      
    next(new ErrorHander("Product not found", 404))

  } else {
   await product.remove()
  
      res.json({
        success:true
      })
  }
})

//getProduct Detaild
exports.getProductDetails = CatchAsyncErros(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
        next(new ErrorHander("Product not found",404))
  } else {
        res.json({
        success: false,
        product
    })
  }
})
  
exports.createProductreview = CatchAsyncErros(async (req, res, next) => {

  const { productId, rating, comment } = req.body
  
  var product = await Product.findById(productId)

  var review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  }

  var isReviewed = product.reviews.find(rev => rev.user.toString() === req.user.id.toString())
  
  if (isReviewed) {
    product.reviews.forEach(rev => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.ratings = rating,
          rev.comment = comment
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
 
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.json({
    success: true,
    product
  })
})

exports.getAllReviews = CatchAsyncErros(async (req, res, next) => {
  console.log(req)
  const product = await Product.findById(req.query.productId)
  if (!product) {
    return next(new ErrorHander("Not found",404))
  }
  res.json({
    success: true,
     reviews:product.reviews
  })
})

exports.deleteReview = CatchAsyncErros(async (req, res, next) => {
  
  const product = await Product.findById(req.query.productId)
  if (!product) {
    return next(new ErrorHander("Not found",404))
  }
  const reviews = product.reviews.filter(r => r._id.toString() !== req.query.id.toString())
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  
  res.json({
    success: true,
    reviews:product.reviews
  })
})

exports.hello = CatchAsyncErros(async (req, res) => {
  res.send("ssss")
 })