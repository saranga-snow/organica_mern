const express = require("express");
const router = express.Router();
const {getAllUsers} = require("../controllers/getAllUsers"); 
const {getUserById} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/:userId/getAllUsers/" , isSignedIn,isAuthenticated,isAdmin, getAllUsers );

module.exports = router;