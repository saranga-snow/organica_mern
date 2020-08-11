import { API } from "../../backend"

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

//// PRODUCTS BY CATEGORY
export const getProductsByCategory = (categoryId) => {
  return fetch(`${API}/products/${categoryId}`, {
    method: "GET"
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
