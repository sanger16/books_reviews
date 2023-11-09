const express = require('express');
const auth = require("../libs/auth");
const jwt = require('jsonwebtoken');

const login_router = express.Router();

login_router.post("/", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (!username || !password) 
        return res.status(404).json({message: "Error logging in"});

    if (auth.authenticatedUser(auth.regUsers, username, password)) {
        /* VERIFICAR SI ES UNA BUENA PRACTICA COLOCAR EN DATA EL PASSWORD */
        let token = jwt.sign({
            data: password
        }, 'asfdasjdnbkj#%&7hfas', {expiresIn: 60 * 60});
        req.session.authorization ={
            token, username
        }
        return res.status(200).json({message: "Welcome you have been logged in!"})
    } else {
        return res.status(205).json({message: "Unable to login. Check username and password"})
    }
})

module.exports = login_router;