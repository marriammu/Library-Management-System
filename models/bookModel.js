const mysql = require("mysql");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "libsystem",
};

const connection = mysql.createConnection(dbConfig);

connection.connect();

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS libsystem`;

connection.query(createDatabaseQuery, (err) => {
  if (err) {
    throw err;
  }

  connection.end();
});

dbConfig.database = "libsystem";

const databaseconnection = mysql.createConnection(dbConfig);
const createBooksTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    ISBN VARCHAR(20) NOT NULL,
    availableQuantity INT NOT NULL,
    shelfLocation VARCHAR(50) NOT NULL
  )
`;
databaseconnection.query(createBooksTableQuery, (err) => {
  if (err) {
    throw err;
  }
});
module.exports = databaseconnection;
