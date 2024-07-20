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
const createBorrowingsTableQuery = `
  CREATE TABLE IF NOT EXISTS borrowings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    borrowerId INT NOT NULL,
    bookId INT NOT NULL,
    dueDate VARCHAR(255) NOT NULL,
    returnDate VARCHAR(255),
    FOREIGN KEY (borrowerId) REFERENCES borrowers(id),
    FOREIGN KEY (bookId) REFERENCES books(id)
  )
`;

databaseconnection.query(createBorrowingsTableQuery, (err) => {
    if (err) {
      throw err;
    }
  });
module.exports = databaseconnection;
