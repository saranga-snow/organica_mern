import { API } from "../../backend"

export const createCategory = (userId, token, category) => {
  console.log("CREATE CATEGORY CALLED!!!!")
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const updateProduct = (productId, userId, token, product) => {
  console.log(`productID :   ${productId}`)
  console.log(`product : ${product}`)
  return fetch(`${API}/product/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const removeProduct = (userId, token, productId) => {
  // console.log("FETCH REQ!!!")
  return fetch(`${API}/product/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accpet: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const updateCategory = (userId, token, categoryId, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
