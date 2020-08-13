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

export const getUserOrders = async (userId, authToken) => {
  console.log("getUserOrders")
  let orders = [
    {
      user: {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4NTYxOWM2MjhiMTBkODg3ZmY2ZmQiLCJpYXQiOjE1OTczMDU5MTR9.tIB8YvDbPCbpgMoxk3wIUjMdISaSQ3z2mJQx42Nd7zE",
        user: {
          _id: "5f185619c628b10d887ff6fd",
          name: "admin",
          email: "admin.hoon@gmail.com",
          role: 1
        }
      },
      products: [
        {
          sold: 3,
          _id: "5f26b59af7072141040d2842",
          name: "PORK",
          description: "PORK",
          price: 120,
          category: {
            _id: "5f2324c605e39a0bd81f6f7a",
            name: "MEAT",
            createdAt: "2020-07-30T19:51:34.289Z",
            updatedAt: "2020-07-30T19:51:34.289Z",
            __v: 0
          },
          stock: 97,
          createdAt: "2020-08-02T12:46:18.356Z",
          updatedAt: "2020-08-11T16:18:54.335Z",
          __v: 0,
          quantity: 2
        },
        {
          sold: 2,
          _id: "5f26b5b5f7072141040d2843",
          name: "TOMATO",
          description: "TOMATO",
          price: 12,
          category: {
            _id: "5f18934132aeba2bb0c4afe4",
            name: "VEGETABLES",
            createdAt: "2020-07-22T19:28:01.433Z",
            updatedAt: "2020-08-02T09:06:03.010Z",
            __v: 0
          },
          stock: 98,
          createdAt: "2020-08-02T12:46:45.438Z",
          updatedAt: "2020-08-11T16:18:54.335Z",
          __v: 0,
          quantity: 2
        },
        {
          sold: 2,
          _id: "5f27195f8c06ba374cdfed60",
          name: "APPLE",
          description: "APPLE",
          price: 10,
          category: {
            _id: "5f23209b3de6fb38dc858eda",
            name: "FRUITS",
            createdAt: "2020-07-30T19:33:47.154Z",
            updatedAt: "2020-07-30T19:33:47.154Z",
            __v: 0
          },
          stock: 98,
          createdAt: "2020-08-02T19:51:59.590Z",
          updatedAt: "2020-08-11T16:18:54.335Z",
          __v: 0,
          quantity: 2
        },
        {
          sold: 1,
          _id: "5f300013f2d9f30f48bab3d9",
          name: "MUTTONS",
          description: "PATHAS",
          price: 260,
          category: {
            _id: "5f2324c605e39a0bd81f6f7a",
            name: "MEAT",
            createdAt: "2020-07-30T19:51:34.289Z",
            updatedAt: "2020-07-30T19:51:34.289Z",
            __v: 0
          },
          stock: 219,
          createdAt: "2020-08-09T13:54:27.575Z",
          updatedAt: "2020-08-11T15:52:06.789Z",
          __v: 0,
          quantity: 1
        },
        {
          sold: 0,
          _id: "5f293f8cbc55c72aa0381dcc",
          name: "CHIKU",
          description: "CHIKU FRUIT",
          price: 80,
          category: {
            _id: "5f23209b3de6fb38dc858eda",
            name: "FRUITS",
            createdAt: "2020-07-30T19:33:47.154Z",
            updatedAt: "2020-07-30T19:33:47.154Z",
            __v: 0
          },
          stock: 100,
          createdAt: "2020-08-04T10:59:24.827Z",
          updatedAt: "2020-08-11T15:51:54.668Z",
          __v: 0,
          quantity: 1
        }
      ],
      transaction_id: "jtqz3802",
      amount: "624.00"
    },
    {
      user: {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4NTYxOWM2MjhiMTBkODg3ZmY2ZmQiLCJpYXQiOjE1OTczMDU5MTR9.tIB8YvDbPCbpgMoxk3wIUjMdISaSQ3z2mJQx42Nd7zE",
        user: {
          _id: "5f185619c628b10d887ff6fd",
          name: "admin",
          email: "admin.hoon@gmail.com",
          role: 1
        }
      },
      products: [
        {
          sold: 2,
          _id: "5f300013f2d9f30f48bab3d9",
          name: "MUTTONS",
          description: "PATHAS",
          price: 260,
          category: {
            _id: "5f2324c605e39a0bd81f6f7a",
            name: "MEAT",
            createdAt: "2020-07-30T19:51:34.289Z",
            updatedAt: "2020-07-30T19:51:34.289Z",
            __v: 0
          },
          stock: 218,
          createdAt: "2020-08-09T13:54:27.575Z",
          updatedAt: "2020-08-13T09:03:32.428Z",
          __v: 0,
          quantity: 2
        },
        {
          sold: 1,
          _id: "5f293f8cbc55c72aa0381dcc",
          name: "CHIKU",
          description: "CHIKU FRUIT",
          price: 80,
          category: {
            _id: "5f23209b3de6fb38dc858eda",
            name: "FRUITS",
            createdAt: "2020-07-30T19:33:47.154Z",
            updatedAt: "2020-07-30T19:33:47.154Z",
            __v: 0
          },
          stock: 99,
          createdAt: "2020-08-04T10:59:24.827Z",
          updatedAt: "2020-08-13T09:03:32.428Z",
          __v: 0,
          quantity: 2
        }
      ],
      transaction_id: "q5kgh0na",
      amount: "680.00"
    },
    {
      user: {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4NTYxOWM2MjhiMTBkODg3ZmY2ZmQiLCJpYXQiOjE1OTczMDU5MTR9.tIB8YvDbPCbpgMoxk3wIUjMdISaSQ3z2mJQx42Nd7zE",
        user: {
          _id: "5f185619c628b10d887ff6fd",
          name: "admin",
          email: "admin.hoon@gmail.com",
          role: 1
        }
      },
      products: [
        {
          sold: 5,
          _id: "5f26b59af7072141040d2842",
          name: "PORK",
          description: "PORK",
          price: 120,
          category: {
            _id: "5f2324c605e39a0bd81f6f7a",
            name: "MEAT",
            createdAt: "2020-07-30T19:51:34.289Z",
            updatedAt: "2020-07-30T19:51:34.289Z",
            __v: 0
          },
          stock: 95,
          createdAt: "2020-08-02T12:46:18.356Z",
          updatedAt: "2020-08-13T09:03:32.428Z",
          __v: 0,
          quantity: 3
        },
        {
          sold: 4,
          _id: "5f26b5b5f7072141040d2843",
          name: "TOMATO",
          description: "TOMATO",
          price: 12,
          category: {
            _id: "5f18934132aeba2bb0c4afe4",
            name: "VEGETABLES",
            createdAt: "2020-07-22T19:28:01.433Z",
            updatedAt: "2020-08-02T09:06:03.010Z",
            __v: 0
          },
          stock: 96,
          createdAt: "2020-08-02T12:46:45.438Z",
          updatedAt: "2020-08-13T09:03:32.428Z",
          __v: 0,
          quantity: 2
        }
      ],
      transaction_id: "5ww0gp93",
      amount: "384.00"
    },
    {
      user: {
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjE4NTYxOWM2MjhiMTBkODg3ZmY2ZmQiLCJpYXQiOjE1OTczMDU5MTR9.tIB8YvDbPCbpgMoxk3wIUjMdISaSQ3z2mJQx42Nd7zE",
        user: {
          _id: "5f185619c628b10d887ff6fd",
          name: "admin",
          email: "admin.hoon@gmail.com",
          role: 1
        }
      },
      products: [
        {
          sold: 8,
          _id: "5f26b59af7072141040d2842",
          name: "PORK",
          description: "PORK",
          price: 120,
          category: {
            _id: "5f2324c605e39a0bd81f6f7a",
            name: "MEAT",
            createdAt: "2020-07-30T19:51:34.289Z",
            updatedAt: "2020-07-30T19:51:34.289Z",
            __v: 0
          },
          stock: 92,
          createdAt: "2020-08-02T12:46:18.356Z",
          updatedAt: "2020-08-13T09:27:50.375Z",
          __v: 0,
          quantity: 2
        },
        {
          sold: 6,
          _id: "5f26b5b5f7072141040d2843",
          name: "TOMATO",
          description: "TOMATO",
          price: 12,
          category: {
            _id: "5f18934132aeba2bb0c4afe4",
            name: "VEGETABLES",
            createdAt: "2020-07-22T19:28:01.433Z",
            updatedAt: "2020-08-02T09:06:03.010Z",
            __v: 0
          },
          stock: 94,
          createdAt: "2020-08-02T12:46:45.438Z",
          updatedAt: "2020-08-13T09:27:50.375Z",
          __v: 0,
          quantity: 2
        }
      ],
      transaction_id: "2m1gr7a0",
      amount: "264.00"
    }
  ]
  return { orders }
}
