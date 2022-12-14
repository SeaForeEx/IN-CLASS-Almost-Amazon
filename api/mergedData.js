// for merged promises

// import client from "../utils/client";
import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';
// API CALLS FOR BOOKS

// const endpoint = client.databaseURL;

const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id).then((authorObject) => resolve({ ...bookObject, authorObject }));
  })
    .catch(reject);
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(firebaseKey).then((booksArray) => resolve({ ...authorObject, booksArray }));
  })
    .catch(reject);
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
