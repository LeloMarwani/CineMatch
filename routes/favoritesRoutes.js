const express = require('express');
const router = express.Router();


const { createList, addMovieToList, getLists, deleteList } = require('../controllers/favoritesController');
const authenticate = require('../middleware/authMiddleware');

// Create a new list 
router.post('/', authenticate, createList);
// Add a movie to a list
router.post('/movie', authenticate, addMovieToList);
// Get all lists
router.get('/', authenticate, getLists);
// Delete a list
router.delete('/:listId', authenticate, deleteList);
module.exports = router
