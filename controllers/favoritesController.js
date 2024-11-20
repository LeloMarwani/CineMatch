const { 
    createList, 
    addMovieToList, 
    getLists,
    deleteList 
} = require('../models/favoritesModel');


  exports.createList = (req, res) => {
   const userId = req.user.userId; // Extract user ID from JWT
   const { listName } = req.body;
 try {
   const newList = createList(userId, listName);
   res.status(201).json({ message: 'List created successfully', list: newList });
} catch (error) {
   res.status(400).json({ error: error.message });
}
};
   exports.addMovieToList = (req, res) => {
   const userId = req.user.userId;
   const { listId, movie } = req.body;
 try {
   const updatedList = addMovieToList(userId, listId, movie);
   res.status(200).json({ message: 'Movie added to list', list: updatedList });
} catch (error) {
   res.status(400).json({ error: error.message });
}
};
   exports.getLists = (req, res) => {
   const userId = req.user.userId;
 try {
   const lists = getLists(userId);
   res.status(200).json(lists);
} catch (error) {
   res.status(400).json({ error: error.message });
}
};
   exports.deleteList = (req, res) => {
    const userId = req.user.userId;
    const listId = parseInt(req.params.listId);
 try {
    const lists = deleteList(userId, listId);
    res.status(200).json({ message: 'List deleted successfully', lists });
} catch (error) {
     res.status(400).json({ error: error.message });
}
};