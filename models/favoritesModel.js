const fs = require('fs');
const path = require('path');


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
// Create a new list
  const createList = (userId, listName) => {
  const data = readData();
  const user = data.users.find((user) => user.id === userId);
 if (!user) {
   throw new Error('User not found');
}
 const newList = { id: Date.now(), name: listName, movies: [] };
 user.lists.push(newList);
 writeData(data);
 return newList;
};
// Add a movie to a list
const addMovieToList = (userId, listId, movie) => {
 const data = readData();
 const user = data.users.find((user) => user.id === userId);
 if (!user) {
   throw new Error('User not found');
 }
 const list = user.lists.find((list) => list.id === listId);
 if (!list) {
   throw new Error('List not found');
 }
 if (list.movies.some((m) => m.id === movie.id)) {
   throw new Error('Movie already in the list');
 }
 list.movies.push(movie);
 writeData(data);
 return list;
};
// Get all lists for a user
 const getLists = (userId) => {
 const data = readData();
 const user = data.users.find((user) => user.id === userId);
 if (!user) {
   throw new Error('User not found');
}
 return user.lists;
};
// Delete a list
 const deleteList = (userId, listId) => {
 const data = readData();
 const user = data.users.find((user) => user.id === userId);
 if (!user) {
   throw new Error('User not found');
}
 user.lists = user.lists.filter((list) => list.id !== listId);
 writeData(data);
 return user.lists;
};
module.exports = { createList, addMovieToList, getLists, deleteList };

