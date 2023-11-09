const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
require('dotenv').config({ path: './config/.env'});

let books = require('./routes/booksdb');
const { merge2Array, mergeSort } = require('./libs/sort');
const { binarySearch } = require('./libs/search');

const app = express();
app.use(express.json());

let booksData = [
    {
    "isbn": "00000",
    "title": "Casas Muertas",
    "author": "Miguel Otero Silva"
    },
    {
    "isbn": "00001",
    "title": "La Muerte de Onorio",
    "author": "Miguel Otero Silva"
    }
];

app.get("/books", (req, res) => {
    res.send(JSON.stringify(booksData))
})

app.get("/books/isbn/:isbn", (req, res) => {
    const reqBook = req.params.isbn;
    console.log(reqBook);
    let book = booksData.filter((el) => el.isbn === reqBook);
    res.send(book);
})

app.get("/books/find/:id", (req, res) => {
    const reqBook = JSON.parse(req.params.id);
    console.log(reqBook);
    let book;
    book = booksData.filter((el) =>
        (el.isbn === reqBook.isbn && el.title === reqBook.title && el.author === reqBook.author) 
    );
    console.log(reqBook.isbn);
    res.send(book);
})

app.listen(process.env.PORT, () => console.log("Server listen on port " + process.env.PORT))

let newBooks = mergeSort(books, 'isbn');

let index = binarySearch(newBooks, parseInt('000005'), 'isbn');

console.log(newBooks);