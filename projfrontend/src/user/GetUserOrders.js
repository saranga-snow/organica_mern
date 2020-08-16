import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { getUserOrders } from "./helper/userapicalls"
import { Link } from "react-router-dom"
import Modal from "react-modal"

Modal.setAppElement("#root")

const GetUserOrder = ({ match }) => {
  const [values, setValues] = useState({
    orders: [],
    error: "",
    loading: false
  })

  const { orders } = values
  const { authToken } = isAuthenticated() && isAuthenticated().authToken
  const { name } = isAuthenticated() && isAuthenticated().user

  const preloadOrders = (userId) => {
    // console.log("preloadOrders")
    getUserOrders(userId, authToken)
      .then((data) => {
        // console.log(data)
        let userOrders = []
        data.forEach((order) => {
          userOrders.push(order)
        })
        setValues({ ...values, orders: userOrders })
      })
      .catch((err) => console.log(err))
  }

  console.log("ORDERS: ", orders)

  useEffect(() => {
    preloadOrders(match.params.userId)
  }, [])

  // const loadOrderLists = () => {
  //   orders.map((order, index) => {
  //     return (

  //     )
  //   })
  // }

  // const dummy = (e) => {
  //   const transId = e.target.id
  //   console.log(e.target)
  // }
  ///////#MODAL DESIGN
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  }

  const [modalState, setModalState] = useState({
    modalIsOpen: false,
    modalOrderId: ""
  })

  const { modalIsOpen, modalOrderId } = modalState

  const openModal = (e) => {
    setModalState({
      ...modalState,
      modalIsOpen: true,
      modalOrderId: e.target.name
    })
  }

  const closeModal = () => {
    setModalState({ ...modalState, modalIsOpen: false, modalOrderId: "" })
  }

  const fetchOrder = () => {
    const orderToFetch = orders.filter((order) => order._id === modalOrderId)

    // orderToFetch.map((order, index) => {
    //   console.log(order.amount)
    //   console.log(order.status)
    //   order.products.map((product, index) => {
    //     console.log(product.name)
    //   })
    // })
    console.log(orderToFetch)

    return (
      <div>
        {orderToFetch.map((order, index) => {
          return (
            <div key={index}>
              <div key={index} className="row">
                <div className="col-4 offset-md-2">
                  <h3>Status: {order.status}</h3>
                </div>
                <div className="col-4 offset-md-2">
                  <h3>Total Amount: {order.amount}</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-center">
                  <h3 className="text-primary">Product Name</h3>
                </div>
                <div className="col-4 text-center">
                  <h3 className="text-primary">Quantity</h3>
                </div>
                <div className="col-4 text-center">
                  <h3 className="text-primary">Price</h3>
                </div>
              </div>
              {order.products.map((item, index) => {
                return (
                  <div key={index} className="row">
                    <div className="col-4 text-center">{item.name}</div>
                    <div className="col-4 text-center">{item.quantity}</div>
                    <div className="col-4 text-center">{item.price}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
  //////MODAL DESIGN

  return (
    <Base title="User Orders Page" description="Your Orders">
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          <Link to="/user/dashboard" className="btn btn=md btn-success mb-3">
            User Dashboard
          </Link>
          {orders.length === 0 ? (
            <h1 className="text-center text-white">You have no orders</h1>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-2 text-center text-primary">
                  <h2>User</h2>
                </div>
                <div className="col-3 text-center text-primary">
                  <h2>Order Id</h2>
                </div>
                <div className="col-2 text-center text-primary">
                  <h2>Total Amount</h2>
                </div>
                <div className="col-3 text-center text-primary">
                  <h2>Date</h2>
                </div>
                <div className="col-2 text-center text-primary">
                  <h2>Details</h2>
                </div>
              </div>
              {orders.map((order, index) => {
                return (
                  <div className="row" key={index} id={order._id}>
                    <div className="col-2 text-center">{name}</div>
                    <div className="col-3 text-center">{order._id}</div>
                    <div className="col-2 text-center">{order.amount}</div>
                    <div className="col-3 text-center">{order.createdAt}</div>
                    <div className="col-2 text-center">
                      <button name={order._id} onClick={openModal}>
                        Order Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          sytle={customStyles}
        >
          <div>
            {fetchOrder()}
            <center>
              <button onClick={closeModal}>Close</button>
            </center>
          </div>
        </Modal>
      </div>
    </Base>
  )
}

export default GetUserOrder
