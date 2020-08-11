require("dotenv").config()
const stripe = require("stripe")(process.env.SK_STRIPE)
const uuid = require("uuid/v4")

exports.makeStripePayment = (req, res) => {
  const { products, token } = req.body
  console.log("PRODUCTS ", products)
  console.log("TOKEN ", token)

  let amount = 0
  products.map((item, index) => {
    amount = amount + item.price * item.quantity
  })

  const idempotencyKey = uuid()

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json({
            transactionId: result.id,
            transactionAmt: result.amount
          })
        })
        .catch((err) => console.log(err))
    })
}
