import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import { getAllCategories, createProduct } from "./helper/adminapicall"
import { isAuthenticated } from "../auth/helper/index"

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  })

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData
  } = values

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const { user, authToken } = isAuthenticated()

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: "", loading: true })
    createProduct(user._id, authToken, formData)
      .then((data) => {
        console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            formData: "",
            createdProduct: data.name,
            error: ""
          })
        }
      })
      .catch()
  }

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct === "" ? "none" : "" }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    )
  }
  const errorMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>Error in creating product : {error}</h4>
      </div>
    )
  }

  ///TODO PERFORM REDIRECT TO ADMIN DASHBOARD ON SUCCESS

  const performRedirect = () => {
    if (createdProduct) {
      setTimeout(() => {
        setValues({ ...values, getRedirect: true })
      }, 3000)
    }
  }

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
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
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              )
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  )

  return (
    <Base
      title="Add Product"
      description="Welcome to product creation"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn=md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{createProductForm()} </div>
      </div>
      {successMessage()} {errorMessage()}
      {performRedirect()}
      {getRedirect && <Redirect to="/admin/dashboard" />}
    </Base>
  )
}

export default AddProduct
