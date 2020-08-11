const express = require("express")
const router = express.Router()
const {
  getProductById,
  getProduct,
  createProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories,
  getProductsByCategory
} = require("../controllers/product")
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//PARAMS
router.param("userId", getUserById)
router.param("productId", getProductById)
router.param("categoryId", getProductsByCategory)

// PRODUCTS BY CATEGORY
// router.param("categoryId", getProductsByCategoryId)

//ROUTES
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
)
router.get("/product/:productId", getProduct)

router.put(
  "/product/:userId/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
)
router.delete(
  "/product/:userId/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
)
//listing route
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

////IMAGE PERFORMANCE OPTIMIZATION
router.get("/product/photo/:productId", photo)

// PRODUCTS BY CATEGORY
router.get("/products/:categoryId", (req, res) => {
  let products = req.body
  res.json(products)
})

module.exports = router
