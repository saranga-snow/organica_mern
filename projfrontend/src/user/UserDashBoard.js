import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"

const UserDashBoard = () => {
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {}, [])

  const user = isAuthenticated() && isAuthenticated().user
  const { name, email, _id } = user

  const userInfoDisp = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header text-dark">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item  text-dark">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Base title="User DashBoard Page">
      <div className="row">
        <div className="col-3 text-white text-center">
          <ul className="list-group">
            <li className="list-group-item text-success">
              <Link
                to={`/user/infoupdate/${_id}`}
                className="nav-link text-success"
              >
                Profile
              </Link>
            </li>
            <li className="list-group-item text-success">
              <Link
                to={`/user/orders/${_id}`}
                className="nav-link text-success"
              >
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-9 text-white text-center">{userInfoDisp()}</div>
      </div>
    </Base>
  )
}

export default UserDashBoard
