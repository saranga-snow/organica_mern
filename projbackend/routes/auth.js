const express = require('express')
const router = express.Router();
const {signup,signin,signout,isSignedIn} = require("../controllers/auth");
const {check} = require("express-validator");

router.post("/signup" , 
[
    check("name").isLength({min: 3}).withMessage("Name should be minimum of 3 characters!"),
    check("email").isEmail().withMessage("Email is required!!"),
    check("password").isLength({min:5}).withMessage("Minimum 5 characters required for password")
] ,
signup);

router.post("/signin" , [
    check("email").isEmail().withMessage("Email is required!!"),
    check("password").isLength({min:5}).withMessage("Minimum 5 characters required for password")
] ,signin);


router.get("/signout", signout);

router.get("/test" , isSignedIn , (req,res) =>{
    res.json(req.auth);
})

module.exports = router;