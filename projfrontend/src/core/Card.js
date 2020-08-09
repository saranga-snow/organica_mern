import React, { useState, useEffect } from "react"
import ImageHelper from "./helper/imageHelper"
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper"
import { Redirect } from "react-router-dom"

const Card = ({
  product,
  addToCartFlg = true,
  removeFromCart = false,
  photo = true,
  quantity = false,
  setReload = (arg) => arg, // function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false)

  const cartTitle = product ? product.name : "PRODUCT NAME"
  const cartDescription = product ? product.description : "DESCRIPTION"
  const cartPrice = product ? product.price : "PRICE"

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true))
  }

  //   const getRedirect = (redirect) => {
  //     if (redirect) {
  //       return <Redirect to="/cart" />
  //     }
  //   }

  const showAddToCart = (addToCartFlg) => {
    return (
      addToCartFlg && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    )
  }

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id)
            setReload(!reload)
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    )
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead text-center">{cartTitle}</div>
      <div className="card-body">
        {/* {redirect && <Redirect to="/cart" />} */}
        {photo && <ImageHelper product={product} />}
        <p className="lead bg-success font-weight-normal text-center text-wrap">
          {cartDescription}
        </p>
        {/* <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p> */}
        <div>
          <div className="row">
            <div className="col-4 text-center">
              <span className="text-white text-center">{cartPrice}</span>
            </div>
            <div className="col-4 text-center">
              {quantity && (
                <span className="text-white text-center">
                  {product.quantity}
                </span>
              )}
            </div>
            <div className="col-4 text-center">
              {quantity && (
                <span className="text-white text-center">
                  {product.quantity * cartPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">{showAddToCart(addToCartFlg)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
