import React, { useState, useEffect } from "react"
import Base from "./Base"
import Card from "./Card"
import { getProducts, getProductsByCategory } from "./helper/coreapicalls"
import { getAllCategories } from "../admin/helper/adminapicall"
import { Link } from "react-router-dom"

const Home = () => {
  const [categories, setCategories] = useState([])

  const loadAllCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log("ERROR TO LOAD CATEGORIES")
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    loadAllCategories()
  }, [])

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadProducts = (categoryId) => {
    if (categoryId) {
      getProductsByCategory(categoryId).then((data) => {
        console.log(data)
        if (data.error) {
          setError(data.error)
        } else {
          setProducts(data)
        }
      })
    } else {
      getProducts()
        .then((data) => {
          if (data.error) {
            setError(data.error)
          } else {
            setProducts(data)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const leftSideHome = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Categories</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span
              onClick={() => {
                loadProducts()
              }}
              className="nav-link text-success hover"
            >
              All Categories
            </span>
          </li>
          {categories.map((category, index) => {
            return (
              <li key={index} className="list-group-item">
                <span
                  onClick={() => {
                    loadProducts(category._id)
                  }}
                  className="nav-link text-success"
                >
                  {category.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const rightSideHome = () => {
    return (
      <div className="row text-center">
        <div className="row text-center">
          <h1 className="text-white text-center">Products</h1>
        </div>
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div className="col-4 mb-4" key={index}>
                  <Card product={product} />
                </div>
              )
            })
          ) : (
            <div>
              <br />
              <h2 className="text-white">
                No Products Found in this category
              </h2>{" "}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Base title="Home Page" description="Welcome to Organic Shop">
      <div className="row">
        <div className="col-2 text-white text-center">{leftSideHome()}</div>
        <div className="col-10 text-center">{rightSideHome()}</div>
      </div>
    </Base>
  )
}

export default Home
