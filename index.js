const express = require('express');
const books = require('./routes/books.js');
const login = require('./routes/login.js');
const register = require('./routes/register.js');
const { requireAuth } = require('./libs/authMiddleware.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');
require('dotenv').config({ path: './config/.env'});

/*  */

let users = [];

const app = express();
app.use(express.json());
app.use('/books/auth', session({secret:"fingerpint",resave: true, saveUninitialized: true}));

app.use('/books/auth', requireAuth);
app.use('/books', books);
app.use('/login', login);
app.use('/register', register);
app.use('/auth', register);

app.listen(process.env.PORT, () => console.log("Server listen on port " + process.env.PORT));