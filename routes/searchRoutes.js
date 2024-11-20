const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { authenticate } = require('../middleware/authMiddleware');

 // Searching for a Movie... 
 router.post('/query', authenticate, searchController.searchQuery);

 router.post('/favorites', authenticate, searchController.addFavorite)
// Endpoint Get Search History... ☺
 router.get('/history', authenticate, async (req, res) => {
 try {
    const history = await SearchHistory.find({ userId: req.user.userId });
    res.json(history)
}   catch (error) {
    res.status(500).json({ error: 'Server error'});
}
});
module.exports = router;
