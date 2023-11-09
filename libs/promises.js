/* THIS FUNCTION RECEIVES ONE PARAMETER AND FIND AN ARRAY OF BOOKS */
function getBook (booksList, searchBy, searchValue) {
    const myPromise  = new Promise((resolve, reject) => {
        let book = booksList.filter((el) => el[`${searchBy}`] === searchValue);
        if (book.length != 0) {
            resolve('Books found! \n' + JSON.stringify(book, ['isbn', 'title', 'author']))
        } else {
            reject('Any book has been found')
        }
    });
    return myPromise;
}
/* THIS FUNCTION RECEIVES AN OBJECT AND FIND A ESPECIFIC BOOK */
function getBookFull (booksList, searchObject) {
    const myPromise  = new Promise((resolve, reject) => {
        let book = booksList.filter((el) =>
            (el.isbn === searchObject.isbn && el.title === searchObject.title && el.author === searchObject.author) 
        );
        if (book.length != 0) {
            resolve('Book found! \n' + JSON.stringify(book, ['isbn', 'title', 'author']))
        } else {
            reject('The book has not been found')
        }
    });
    return myPromise;
}

module.exports = { getBook, getBookFull };