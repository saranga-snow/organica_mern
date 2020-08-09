import React, { useState, useEffect } from "react"
import Base from "./Base"
import { Link } from "react-router-dom"
import Card from "./Card"
import { loadCart } from "./helper/cartHelper"
import StripeCheckOut from "./stripeCheckOut"
import BraintreeCheckOut from "./braintreeCheckOut"

const Cart = () => {
  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  const loadCartProducts = (products) => {
    return (
      <div>
        <h2> LOAD PRODUCTS FROM CART</h2>

        {products.length === 0 ? (
          <h3 className="text-white text-center"> No items in cart </h3>
        ) : (
          products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addToCartFlg={false}
                photo={false}
                quantity={true}
                setReload={setReload}
                reload={reload}
              />
            )
          })
        )}
      </div>
    )
  }

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row">
        <div className="col-6">{loadCartProducts(products)}</div>
        <div className="col-6">
          <StripeCheckOut products={products} setReload={setReload} />
          <BraintreeCheckOut products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  )
}

export default Cart
