const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();
const baseURL = 'https://deniskimani2-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai';

const doesExist = (username) => {
  let userwithsamename = users.filter((user) => {
    return user.username === username
  });
  return userwithsamename.length > 0;
}

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  } else if (!(username && password)) {
    return res.status(404).json({ message: "Username and password have not been provided" })
  }

  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
    const allBooks = await fetchAllBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn_number = req.params.isbn;
  try {
    const bookDetails = await fetchBookDetailsByISBN(isbn_number);
    return res.status(200).json(bookDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const booksByAuthor = await fetchBooksByAuthor(author);
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all books based on title using Async-Await and Axios (Task 13)
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const booksByTitle = await fetchBooksByTitle(title);
    return res.status(200).json(booksByTitle);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  const isbn_number = req.params.isbn;
  try {
    const bookReviews = await fetchBookReviewsByISBN(isbn_number);
    return res.status(200).json(bookReviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports.general = public_users;
