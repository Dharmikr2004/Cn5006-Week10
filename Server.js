const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Books = require('./BooksSchema');
require('./MongoDBConnect'); // This will establish the MongoDB connection

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = 5000;

app.get('/allbooks', (req, res) => {
  Books.find({}, (err, allBooks) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving books');
    } else {
      res.json(allBooks);
    }
  });
});

app.get('/getbook/:id', (req, res) => {
  const id = req.params.id;
  Books.findById(id, (err, book) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving book');
    } else {
      res.json(book);
    }
  });
});

app.post('/addbooks', (req, res) => {
  const newBook = new Books(req.body);
  newBook.save()
    .then(() => res.status(200).json({ message: 'Book added successfully' }))
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error adding book');
    });
});

app.post('/updatebook/:id', (req, res) => {
  const id = req.params.id;
  const updatedBook = req.body;

  Books.findByIdAndUpdate(id, updatedBook, { new: true }, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send('Error updating book');
    } else {
      res.status(200).json({ message: 'Book updated successfully' });
    }
  });
});

app.post('/deleteBook/:id', (req, res) => {
  const id = req.params.id;

  Books.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send('Error deleting book');
    } else {
      res.status(200).send('Book deleted successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
