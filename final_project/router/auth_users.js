const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

// Sample users array for demonstration purposes
let users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const isValid = (username) => {
  // Write code to check if the username is valid
  // ...
};

const authenticatedUser = (username, password) => {
  // Write code to check if username and password match the one we have in records
  // ...
};

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username; // Assuming you have the username stored in the session
  const reviewText = req.query.review; // Assuming the review is passed as a query parameter

  // Find the book by ISBN
  const book = books[isbn];

  // Check if the book exists
  if (book) {
    // Check if the user has an existing review for this book
    if (book.reviews && book.reviews[username]) {
      // Modify the existing review
      book.reviews[username] = reviewText;
      return res.status(200).json({ message: "Review modified successfully" });
    } else {
      // Add a new review for the user
      if (!book.reviews) {
        book.reviews = {};
      }
      book.reviews[username] = reviewText;
      return res.status(201).json({ message: "Review added successfully" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
