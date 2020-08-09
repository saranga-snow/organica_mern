import React, { useState } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper/index"
import { Link } from "react-router-dom"
import { createCategory } from "../admin/helper/adminapicall"

const UpdateCategory = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, authToken } = isAuthenticated()

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    )
  }

  const handleChange = (event) => {
    setError("")
    setName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setError("")
    setSuccess(false)

    ////backend call
    createCategory(user._id, authToken, { name }).then((data) => {
      if (data.error) {
        setError(true)
      } else {
        setError("")
        setSuccess(true)
        setName("")
      }
    })
  }

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead"> Enter Category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            placeholder="For Ex. FRUITS"
            onChange={handleChange}
            value={name}
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    )
  }

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated</h4>
    }
  }
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to Update Category</h4>
    }
  }
  return (
    <Base
      className="container bg-info p-4"
      title="Create a category"
      description="Add new category in ORGANICA SHOP"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {myCategoryForm()} {successMessage()} {errorMessage()} {goBack()}
        </div>
      </div>
    </Base>
  )
}

export default UpdateCategory
