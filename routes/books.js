const express = require('express');
const router = express.Router();
const bookOperations = require('../data/books');

// GET /api/books - Get all books or search books
router.get('/', (req, res) => {
  try {
    const { search, category } = req.query;
    
    let result;
    if (search) {
      result = bookOperations.searchBooks(search);
    } else if (category) {
      result = bookOperations.getBooksByCategory(category);
    } else {
      result = bookOperations.getAllBooks();
    }
    
    res.json({
      success: true,
      data: result,
      count: result.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
});

// GET /api/books/:id - Get a specific book
router.get('/:id', (req, res) => {
  try {
    const book = bookOperations.getBookById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    });
  }
});

// POST /api/books - Add a new book
router.post('/', (req, res) => {
  try {
    const { title, author, isbn, price, category, stock, description } = req.body;
    
    // Basic validation
    if (!title || !author || !price) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, and price are required'
      });
    }
    
    const newBook = bookOperations.addBook({
      title,
      author,
      isbn,
      price: parseFloat(price),
      category,
      stock: parseInt(stock) || 0,
      description
    });
    
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding book',
      error: error.message
    });
  }
});

// PUT /api/books/:id - Update a book
router.put('/:id', (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Convert numeric fields
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    
    const updatedBook = bookOperations.updateBook(req.params.id, updateData);
    
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', (req, res) => {
  try {
    const deletedBook = bookOperations.deleteBook(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message
    });
  }
});

module.exports = router;