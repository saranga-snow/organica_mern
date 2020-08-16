const { Order, ProductCart } = require("../models/order")

////CHECK FOR DIFFERENCE WITH EXEC COMMAND
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "No order found"
        })
      }
      req.order = order
      next()
    })
}

exports.createOrder = (req, res) => {
  console.log("CREATE ORDER REQ!!!")
  req.body.order.user = req.profile
  console.log(req.body.order)
  const orders = new Order(req.body.order)
  orders.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      })
    }
  })
  return res.json(orders)
}

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err || !order) {
        return res.status(400).json({
          error: "No orders Found!!!"
        })
      }
      res.json(orders)
    })
}

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: " Cannot update order status"
        })
      }
      res.json(order)
    }
  )
}

exports.getUserOrders = (req, res) => {
  console.log("getUserOrders")
  console.log(req.profile._id)
  Order.find({ user: req.profile._id }).exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: "Cannot find orders"
      })
    } else {
      console.log(orders)
      res.json(orders)
    }
  })
}
