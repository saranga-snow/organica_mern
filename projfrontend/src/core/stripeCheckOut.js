import React, { useState, useEffect } from "react"
import { isAuthenticated } from "../auth/helper"
import { emptyCart, loadCart } from "./helper/cartHelper"
import { Link } from "react-router-dom"
import StripCheckout from "react-stripe-checkout"
import { API } from "../backend"
import { createOrder } from "./helper/orderHelper"

const StripeCheckOut = ({
  products,
  setReload = (arg) => arg,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  })

  const authToken = isAuthenticated() && isAuthenticated().authToken
  const userId = isAuthenticated() && isAuthenticated().user._id

  const getFinalPrice = () => {
    let amount = 0
    if (products.length !== 0) {
      products.map((item, index) => {
        amount = amount + item.price * item.quantity
        return amount
      })
    }
    return amount
  }

  const makePaymentStripe = (token) => {
    const body = {
      token,
      products
    }

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        const { status } = response
        console.log("STATUS ", status)
        emptyCart()
        setReload(!reload)
      })
      .catch((err) => console.log(err))
  }

  const showsStripeButton = () => {
    return isAuthenticated() ? (
      <StripCheckout
        stripeKey={process.env.REACT_APP_PK_STRIPE}
        token={makePaymentStripe}
        amount={getFinalPrice() * 100}
        name="CheckOut with Stripe"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning"> SignIn</button>
      </Link>
    )
  }

  return (
    <div>
      <h3 className="text-white">STRIPE {getFinalPrice()}</h3>
      {showsStripeButton()}
    </div>
  )
}

export default StripeCheckOut
