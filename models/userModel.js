

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const dataFilePath = path.join(__dirname, '../data/data.json');
// Helper to read data from JSON
const readData = () => {
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);

};
// Helper to write data to JSON
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

};
// Register a new user

const registerUser = async (username, email, password) => {
  const data = readData();
  const existingUser = data.users.find((user) => user.email === email);
  if (existingUser) {
    throw new Error('Email already registered');

}

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, email, password: hashedPassword };
  data.users.push(newUser);
  writeData(data);
  return newUser;

};
// Login a user

const loginUser = async (email, password) => {
  const data = readData();
  const user = data.users.find((user) => user.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
}

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');

}
   return user;

};

module.exports = { registerUser, loginUser }; 