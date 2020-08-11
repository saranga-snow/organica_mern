import React, { useState, useEffect } from "react"
import { loadCart, emptyCart } from "./helper/cartHelper"
import { Link } from "react-router-dom"
import { getToken, makeBtPayment } from "./helper/paymentBraintreeHelper"
import { createOrder } from "./helper/orderHelper"

import DropIn from "braintree-web-drop-in-react"
import { isAuthenticated } from "../auth/helper"

const BraintreeCheckOut = ({
  products,
  setReload = (f) => f,
  reload = undefined
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: ""
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const user = isAuthenticated()
  const token = isAuthenticated() && isAuthenticated().authToken

  const getClientToken = (userId, token) => {
    // console.log("getClientToken")
    getToken(userId, token).then((info) => {
      // console.log("INFORMATION :", info)
      if (info.error) {
        setInfo({ ...info, error: info.error })
      } else {
        const clientToken = info.clientToken
        setInfo({ clientToken })
      }
    })
  }

  const showBTDropIn = () => {
    return (
      <div>
        {token && info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or Add something to cart</h3>
        )}
      </div>
    )
  }

  const onPurchase = () => {
    setInfo({ loading: true })
    let nonce
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotalAmount()
        }
        makeBtPayment(userId, token, paymentData)
          .then((response) => {
            setInfo({ ...info, success: response.success, loading: false })
            console.log(response)
            const orderData = {
              user: user,
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount
            }
            createOrder(userId, token, orderData)
              .then((data) => {
                console.log(data)
              })
              .catch((err) => console.log(err))
            console.log("PAYMENT SUCCESS!!!!")
            emptyCart()
            setReload(!reload)
          })
          .catch((err) => {
            setInfo({ loading: false, success: false })
          })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getClientToken(userId, token)
  }, [reload])

  const getTotalAmount = () => {
    let amount = 0
    products.map((item, index) => {
      amount = amount + item.price * item.quantity
    })
    return amount
  }
  let amount = 0
  return (
    <div>
      <h2 className="text-white">
        Pay <span className="text-danger">Rs.{getTotalAmount()}</span> with
        Braintree
      </h2>
      {showBTDropIn()}
    </div>
  )
}

export default BraintreeCheckOut
