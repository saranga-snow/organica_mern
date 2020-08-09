import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper/index"
import { Link, Redirect } from "react-router-dom"
import { getCategory, updateCategory } from "../admin/helper/adminapicall"

const UpdateCategory = ({ match }) => {
  const [category, setCategory] = useState([])

  const { user, authToken } = isAuthenticated()

  const { name, error, updatedCategory, loading, getRedirect } = category

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategory({
          ...category,
          name: data.name
        })
      }
    })
  }

  useEffect(() => {
    preload(match.params.categoryId)
  }, [])

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
    setCategory({
      ...category,
      name: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setCategory({ ...category, error: "", loading: true })
    updateCategory(user._id, authToken, match.params.categoryId, { name })
      .then((data) => {
        if (data.error) {
          console.log(data.error)
          setCategory({
            ...category,
            error: true
          })
        } else {
          setCategory({
            ...category,
            name: "",
            error: false,
            updatedCategory: data.name,
            loading: false
          })
          //   preload(match.params.categoryId)
        }
      })
      .catch((err) => console.log(err))
  }

  const performReidrect = () => {
    if (!error) {
      setTimeout(() => {
        setCategory({ ...category, getRedirect: true })
      }, 3000)
    }
  }

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead"> Enter New Category Name</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            onChange={handleChange}
            value={name}
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    )
  }

  const successMessage = () => {
    // console.log("SUCCESS MESSAGE")
    if (updatedCategory) {
      return (
        <h4 className="text-success">Category Updated to {updatedCategory}</h4>
      )
    }
  }
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to Create Category</h4>
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
          {goBack()} {myCategoryForm()} {successMessage()} {errorMessage()}
          {performReidrect()}
          {getRedirect && <Redirect to="/admin/categories" />}
        </div>
      </div>
    </Base>
  )
}

export default UpdateCategory
