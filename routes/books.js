const express = require('express');
const { getBook, getBookFull } = require('../libs/promises');
let { booksData } = require('./booksdb');

const books_router = express.Router();


/* RETRIEVE ALL THE BOOKS */
books_router.get("/", async (req, res) => {
    try {
        let books = await JSON.stringify(booksData, ["isbn","title","author"]); /* THIS WILL BE A DATABASE QUERY AND CAN TAKE SOME TIME */
        res.send(books);
    } catch (error) {
        console.log(error);
        next(error);
    }    
});
/* GET BOOK BY ISBN */
books_router.get("/isbn/:isbn", (req, res) => {
    const reqBook = req.params.isbn;
    getBook(booksData, 'isbn', reqBook).then ((data) => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});
/* GET BOOKS BY AUTHOR */
books_router.get("/author/:author", (req, res) => {
    const reqBook = req.params.author;
    getBook(booksData, 'author', reqBook).then ((data) => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});
/* GET BOOKS BY TITLE */
books_router.get("/title/:title", (req, res) => {
    const reqBook = req.params.title;
    getBook(booksData, 'title', reqBook).then ((data) => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});
/* FIND BOOK BY ALL ITS PARAMETERS */
books_router.get("/find/:id", (req, res) => {
    const reqBook = JSON.parse(req.params.id);
    getBookFull(booksData, reqBook).then ((data) => {
        res.send(data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});

books_router.get("/review/:isbn", (req, res) => {
    const reqRev = req.params.isbn;
    let review = booksData.filter((el) => el.isbn === reqRev)[0];
    console.log(review);
    res.send(JSON.stringify(review.reviews, null, 4));
});
/* For this route the review parameter is an object {isbn,review} */
books_router.post("/auth/addReview/", (req, res) => {
    const review = req.query;
    const user = req.session.authorization['username'];
    let i = 0;
    const addRev = {"user":user,"comment":review.review};
    booksData.forEach((element) => {
        if (element.isbn === review.isbn) {
            element.reviews.push(addRev);
            i++;
        }
    })
    if (i != 0) {
        res.send("Your review has been added");
    } else {
        res.send("The ISDN provided does not exist, please first add this book and then add reviews")
    }
});
/* For this route the review parameter is an object {isbn,review} */
books_router.put("/auth/changeReview/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const user = req.session.authorization['username'];
    let i = 0;
    const addRev = {"user":user,"comment":review};
    booksData.forEach((element) => {
        if (element.isbn === isbn) {
            books = element.filter((el) => el.reviews.user != user);
            element.reviews = books.push(addRev);
            i++;
        }
    })
    if (i != 0) {
        res.send("Your review has been modified");
    } else {
        res.send("The ISDN provided does not exist or the user never has comment this book")
    }
});

module.exports = books_router;