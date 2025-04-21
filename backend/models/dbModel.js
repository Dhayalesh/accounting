require('dotenv').config(); 
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) throw err;
  console.log('Database checked/created');

  db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err) throw err;

    db.changeUser({ database: process.env.DB_NAME }, err => {
      if (err) throw err;

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255),
          phone_number VARCHAR(20),
          password VARCHAR(255)
        )`;
      db.query(createTableQuery, err => {
        if (err) throw err;
        console.log('✅ Users table is ready.');
      });
    });
  });
});

module.exports = db;
