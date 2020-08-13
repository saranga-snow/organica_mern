import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { getUserOrders } from "./helper/userapicalls"
import { Link } from "react-router-dom"

const GetUserOrder = ({ match }) => {
  const [values, setValues] = useState({
    orders: [],
    error: "",
    loading: false
  })

  const { orders } = values
  const { authToken } = isAuthenticated() && isAuthenticated().authToken

  const preloadOrders = (userId) => {
    getUserOrders(userId, authToken)
      .then((data) => {
        let userOrders = []
        data.orders.forEach((order) => {
          userOrders.push(order)
        })
        setValues({ ...values, orders: userOrders })
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    preloadOrders(match.params.userId)
  }, [])

  // const loadOrderLists = () => {
  //   orders.map((order, index) => {
  //     return (

  //     )
  //   })
  // }

  return (
    <Base title="User Orders Page" description="Your Orders">
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          <Link to="/user/dashboard" className="btn btn=md btn-success mb-3">
            User Dashboard
          </Link>
          {/* {orders.length > 0 ? loadOrderLists() : <h1>No orders</h1>} */}
          <div className="row">
            <div className="col-4 text-center text-primary">
              <h2>User</h2>
            </div>
            <div className="col-4 text-center text-primary">
              <h2>Transaction Id</h2>
            </div>
            <div className="col-4 text-center text-primary">
              <h2>Total Amount</h2>
            </div>
          </div>
          {orders.map((order, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-4 text-center">{order.user.user.name}</div>
                <div className="col-4 text-center">{order.transaction_id}</div>
                <div className="col-4 text-center">{order.amount}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}

export default GetUserOrder
