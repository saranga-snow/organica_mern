const { API } = require("../../backend")

export const getToken = (userId, token) => {
  console.log("getToken")
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const makeBtPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymentInfo)
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
