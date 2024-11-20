const { searchMovies, getMovieDetails} = require('../config/tmdb');
const { addSearchHistory, getSearchHistory }= require('../models/favoritesModel');



exports.searchQuery = async (req, res) => {

   const { query, genre, page } = req.body;
 try  {
    const movies = await searchMovies(query, genre, page);
    const searchHistory = new SearchHistory({
      userId: req.user.userId,
      query,
      results: movies,
      createdAt: new Date() };
      
      addSearchHistory(searchHistory);
      await searchHistory.save();
      res.json({ movies });
}     catch (error)   {
      res.status(500).json({ error: 'Server error' });
}
};

exports.getSearchHistory = async (req, res) => {
 
   try {
   const history = await SearchHistory.find({ userId: req.user.userId });
   res.json(history);
}  catch (error) {
   res.status(500).json({ error: 'Server error' });
}
};

exports.addFavorite = async (req, res ) => {
  const { movie } = req.body;
try { 

   const history = await SearchHistory.findOne({ userId: req.user.userId })
   if (!history) {
   return res.status(404).json({ error: 'Search Histroy not found '});
}
   history.favorite.push(movie); //Add movie to favorite
   await history.save();

   res.json({ message: 'Movie added to favorite ', favorites:  history.favorite});
} catch {
   res.status(500).json({ error: 'Server Error '});


}

};