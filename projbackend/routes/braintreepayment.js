const express = require("express")
const router = express.Router()
const { isSignedIn, isAuthenticated } = require("../controllers/auth")

const {
  getToken,
  makeBraintreePayment
} = require("../controllers/makeBraintreePayment")
const { getUserById } = require("../controllers/user")

////PARAMS
router.param("userId", getUserById)

////routes
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  makeBraintreePayment
)
module.exports = router
