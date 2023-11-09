const express = require('express');
const auth = require("../libs/auth");

const reg_router = express.Router();

reg_router.post("/", (req, res) => {

    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        if (!auth.doesExist(auth.regUsers,username)) { 
            /* COULD REQUIRE AN ASYNC FUNCTION SINCE IT WILL BE IMPLEMENTED USING A DATABASE QUERY */
            auth.regUsers.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user."});
})

module.exports = reg_router;