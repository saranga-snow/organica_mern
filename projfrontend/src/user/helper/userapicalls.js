import { API } from "../../backend"

export const getUserById = async (userId, authToken) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then((response) => {
      if (response.error) {
        console.log("Error: ", response.error)
      } else {
        return response.json()
      }
    })
    .catch((err) => console.log(err))
}

export const updateUser = (userId, user, authToken) => {
  console.log(user)
  return fetch(`${API}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(user)
  })
}

export const getUserOrders = (userId, authToken) => {
  return fetch(`${API}/orders/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then((response) => {
      if (response.error) {
        console.log("Error: ", response.error)
      } else {
        return response.json()
      }
    })
    .catch((err) => console.log(err))
}
