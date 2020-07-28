const User = require("../models/user");

exports.getAllUsers = (req,res) => {
    User.find({},(err,users) => {
        if(err || !users){
            return res.status(400).json({
                error: "ERROR OCCURED"
            })
        }
        return res.json(user);
    })
}