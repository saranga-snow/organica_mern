const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found!!!!"
      })
    }
    req.profile = user
    next()
  })
}

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.salt = undefined
  req.profile.encry_password = undefined
  req.profile.createdAt = undefined
  req.profile.updatedAt = undefined
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Updation failed!!!!!"
        })
      }

      user.salt = undefined
      user.encry_password = undefined
      user.createdAt = undefined
      user.updatedAt = undefined
      return res.json(user)
    }
  )
}

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in this account"
        })
      }
      return res.json(order)
    })
}

///MIDDLEWARE

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  req.body.order.products.forEach((item) => {
    purchases.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    })
  })

  ////store in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list"
        })
      }
      next()
    }
  )
}
