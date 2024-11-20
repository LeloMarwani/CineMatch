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
// Add search history
const addSearchHistory = (userId, query, results) => {
 const data = readData();
 const newSearch = { id: Date.now(), userId, query, results, createdAt: new Date() };
 data.searchHistory.push(newSearch);
 writeData(data);
 return newSearch;
};
// Get search history by user ID
const getSearchHistory = (userId) => {
 const data = readData();
 return data.searchHistory.filter((entry) => entry.userId === userId);
};
module.exports = { addSearchHistory, getSearchHistory };

