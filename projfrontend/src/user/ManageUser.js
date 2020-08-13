import React, { useState, useEffect } from "react"
import { getUserById, updateUser } from "./helper/userapicalls"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"

const ManageUser = ({ match }) => {
  console.log("Manage USER")

  const { authToken } = isAuthenticated()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    loading: false,
    error: ""
  })
  const { name, email, phone, error } = user

  const preloadUser = (userId) => {
    // console.log("preloader")
    setUser({ ...user, loading: true })
    getUserById(userId, authToken)
      .then((data) => {
        if (data.error) {
          setUser({ ...user, error: data.error })
        } else {
          setUser({
            ...user,
            name: data.name,
            phone: data.phone,
            email: data.email,
            loading: false
          })
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    preloadUser(match.params.userId)
  }, [])

  const handleChange = (name) => (event) => {
    console.log([name])
    console.log(event.target.value)
    setUser({ ...user, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    updateUser(match.params.userId, user, authToken)
      .then((data) => {
        if (data.error) {
          setUser({ ...user, error: data.error, loading: false })
        } else {
          setUser({ ...user, name: data.name, phone: data.phone, error: false })
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Base title="User Update Page" description="Update your information here">
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          <Link to="/user/dashboard" className="btn btn=md btn-success mb-3">
            User Dashboard
          </Link>
          <form>
            <div className="form-group">
              <input
                onChange={handleChange("name")}
                name="photo"
                className="form-control"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="form-group">
              <input
                onChange={handleChange("phone")}
                type="number"
                className="form-control"
                placeholder="Contact No"
                value={phone}
              />
            </div>
            <center>
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
              >
                Update User
              </button>
            </center>
            {!error && error !== "" && (
              <span className="text-white">User Updated Successfully</span>
            )}{" "}
          </form>
        </div>
      </div>
    </Base>
  )
}

export default ManageUser
