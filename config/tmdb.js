const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

exports.searchMovies = async (query, genre, page = 1) => {
 try {
   const params = {
     api_key: TMDB_API_KEY,
     query,
     page,
};
   if (genre) {
    params.with_genres = genre; 
}

   const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, { params });
   return response.data.results;
} catch (error) {
   throw error;
}
};

 exports.getMovieDetails = async (movieId) => {
try{
   const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY },
   });
   return response.data;
} catch (error) {
   throw error;
}
};