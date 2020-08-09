const express = require("express")
const router = express.Router()
const { makeStripePayment } = require("../controllers/makeStripePayment")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")

router.post("/stripepayment", makeStripePayment)

module.exports = router
