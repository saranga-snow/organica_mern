export const addItemToCart = (item, next) => {
  item.quantity = 1
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    let flg = 1
    cart.map((cartItem, index) => {
      if (cartItem._id === item._id) {
        cartItem.quantity = cartItem.quantity + 1
        flg = 0
      }
    })
    if (flg) {
      cart.push({ ...item })
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  next()
}

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    } else {
      return []
    }
  }
}

export const removeItemFromCart = (productId) => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
  }
  cart.map((product, index) => {
    if (product._id == productId) {
      product.quantity = product.quantity - 1
      if (product.quantity === 0) {
        cart.splice(index, 1)
      }
    }
  })

  localStorage.setItem("cart", JSON.stringify(cart))
  return cart
}

export const emptyCart = () => {
  console.log("EMPTY CART")
  if (typeof window !== undefined) {
    localStorage.removeItem("cart")
  }
}
