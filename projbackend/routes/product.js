const express = require("express");
const router = express.Router();
const {getProductById,getProduct,createProduct,photo,updateProduct,removeProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product");
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");



//PARAMS
router.param("userId",getUserById);
router.param("productId", getProductById);



//ROUTES
router.post("/product/create/:userId" , isSignedIn,isAuthenticated,isAdmin, createProduct);
router.get("/product/:productId", getProduct);
router.put("/product/:userId/:productId", isSignedIn,isAuthenticated,isAdmin, updateProduct ) ;
router.delete("/product/:userId/:productId",isSignedIn,isAuthenticated,isAdmin, removeProduct) ;
    //listing route
router.get("/products",getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

////IMAGE PERFORMANCE OPTIMIZATION
router.get("/product/photo/:productId", photo);


module.exports = router;



