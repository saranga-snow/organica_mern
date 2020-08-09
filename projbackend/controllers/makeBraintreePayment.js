require("dotenv").config()

var braintree = require("braintree")

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

exports.getToken = (req, res) => {
  console.log("GET TOKEN!!")
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
}

exports.makeBraintreePayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce
  const amountFromTheClient = req.body.amount
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    },
    (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Error in Payment"
        })
      } else {
        res.json(result)
      }
    }
  )
}
