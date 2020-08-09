import React, { useState, useEffect } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import { getAllCategories, deleteThisCategory } from "./helper/adminapicall"
import { API } from "../backend"

const ManageCategories = () => {
  const [categories, setCategories] = useState([])

  const { user, authToken } = isAuthenticated()

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  let noOfCategory = categories.length

  useEffect(() => {
    preload()
  }, [])

  const deleteThisCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json"
      }
    })
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          preload()
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <Base title="Welcome admin" description="Manage your categories here">
      <h3 className="text-white">All Categories</h3>
      <Link to="/admin/dashboard">
        <span className="btn btn-info"> Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            {noOfCategory} Categories
          </h2>
          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center text-white mb-3">
                <div className="col-4 text-center">
                  <h3 className="text-white my-3">{category.name}</h3>
                </div>
                <div className="col-4 text-center">
                  <Link to={`/admin/category/update/${category._id}`}>
                    <button className="btn btn-success my-3">
                      Update Category
                    </button>
                  </Link>
                </div>
                <div className="col-4 text-center">
                  <button
                    className="btn btn-danger my-3"
                    onClick={() => {
                      deleteThisCategory(category._id)
                    }}
                  >
                    Delete Category
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}

export default ManageCategories
