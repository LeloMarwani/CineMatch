const jwt = require('jsonwebtoken');
// Middleware function to authenticate requests

exports.authenticate = (req, res, next) => {
// Get the token from the Authorization header

  const authHeader = req.headers.authorization;
// Check if the Authorization header is missing

  if (!authHeader) {

    return res.status(401).json({ error: 'Authorization header is missing.' });

  }
// Extract the token from the header

  const token = authHeader.split(' ')[1]; // Assumes "Bearer <token>" format

  try {
// Verify the token using the JWT_SECRET environment variable

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Attach the decoded user data to the request object for later use

    req.user = decoded;
// Move to the next middleware or route handler

    next();

  } catch (error) {
// Handle invalid or expired token

    res.status(403).json({ error: 'Invalid or expired token.' });

  }

}; 