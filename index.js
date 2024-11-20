const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const favoritesRoutes = require('./routes/favoritesRoutes');

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authenticate = require('./middleware/authMiddleware');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/lists', favoritesRoutes);



app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});