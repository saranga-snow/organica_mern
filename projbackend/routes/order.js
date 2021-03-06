const express = require("express")
const router = express.Router()
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getUserOrders
} = require("../controllers/order")

//PARAMS
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//ROUTES

// User router to get all orders
router.get("/orders/:userId", getUserOrders)

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
)

// router.post("/order/create/:userId", isSignedIn, isAuthenticated, createOrder)

router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
)

////ROUTER   status of order
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
)
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
)

module.exports = router
