const Order = require("../model/OrderModel");
const ErrorHander = require("../utils/errorhander");
const CatchAsyncErros = require("../middleware/CatchAsyncErros");
const ApiFeatures = require("../utils/apifeatures");
const Product = require("../model/productModel");

exports.newOrder = CatchAsyncErros(async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    const order = await Order.create({
       shippingInfo,
        
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id
    })
    if (order) {
       const order1 = await Order.findById(order._id)
        order1.orderItems.push(orderItems)
       await order1.save()
        res.json({
                success: true,
                order1
            })
    } else {
                res.json({
                msg:"Something went wrong..."
            })
    }
   
})

exports.getSingleOrder = CatchAsyncErros(async (req, res, next) => {
    console.log(req.params.id)
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = CatchAsyncErros(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrders = CatchAsyncErros(async (req, res, next) => {
  const orders = await Order.find()
  let totalAmount;
  orders.forEach(or => {
    totalAmount += or.totalPrice 
  })
  res.json({
    success: true,
    totalAmount,
    orders
  })
})

exports.updateOrder = CatchAsyncErros(async (req, res, next) => {
  const orders = await Order.findById(req.params.id )

  if (orders.orderStatus == "Delivered") {
    return next(new ErrorHander("Order already delivered",400))
  }

  orders.orderItems.forEach(async or => {
    await updateStock(or.Product,or.quantity)
  })
  orders.orderStatus = req.body.status
  if (req.body.status == "Delivered") {
    orders.deliveredAt = Date.now()

  }
  await orders.save({validateBeforeSave:false})
  res.json({
    success:true
  })

  res.json({
    success: true,
    totalAmount,
    orders
  })
})
async function updateStock(id, quantity) {
  const product = await Product.findById(id)
  product.stock -= quantity
  product.save({validateBeforeSave:false})
}


// delete Order -- Admin
exports.deleteOrder = CatchAsyncErros(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});