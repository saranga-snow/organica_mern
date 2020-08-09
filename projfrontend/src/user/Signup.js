import React, { useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    error: "",
    success: false
  })

  const { name, email, password, phone, error, success } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    console.log(values)
    event.preventDefault()
    setValues({ ...values, error: false })
    signup({ name, email, password, phone })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          console.log(data)
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone: "",
            error: "",
            success: true
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Phone</label>
              <input
                className="form-control"
                onChange={handleChange("phone")}
                type="text"
                value={phone}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            {/* <div className="form-group">
                            <label className="text-light">Confirm Password</label>
                            <input className="form-control" type="password"/>
                        </div> */}
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              SignUp
            </button>
          </form>
          <p className="text-white">{JSON.stringify(values)}</p>
        </div>
      </div>
    )
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin"> Login here</Link>
          </div>
        </div>
      </div>
    )
  }
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}. Error creating the account.
          </div>
        </div>
      </div>
    )
  }

  return (
    <Base title="Sign Up Page" description="A page for user SIgnUp!!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  )
}

export default Signup
