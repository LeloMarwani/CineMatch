backend/controllers/authController.json
const { registerUser, loginUser } = require('../models/userModel');

const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
 try {
   const { username, email, password } = req.body;
   const newUser = await registerUser(username, email, password);
   res.status(201).json({ message: 'User registered successfully', user: newUser });
} catch (error) {
   res.status(400).json({ error: error.message });
}
};
exports.login = async (req, res) => {
 try {
   const { email, password } = req.body;
   const user = await loginUser(email, password);
   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
     expiresIn: '1h',
});
   res.json({ token, user });
} catch (error) {
   res.status(400).json({ error: error.message });
}
};

