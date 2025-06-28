const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = __dirname + '/../database/oga_importer.db';
console.log('🛠️ Loading DB from:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
  }
});

module.exports = db;
