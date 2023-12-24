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
    console.error("Error creating database:", err);
    throw err;
  } else {
    console.log("Database created successfully");
  }

  connection.end();
});

dbConfig.database = "libsystem";
console.log(dbConfig);

const databaseconnection = mysql.createConnection(dbConfig);
const createBorrowersTableQuery = `
  CREATE TABLE IF NOT EXISTS borrowers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    registeredDate VARCHAR(255) NOT NULL
  )
`;
databaseconnection.query(createBorrowersTableQuery, (err) => {
  if (err) {
    console.error("Error creating borrowers table:", err);
    throw err;
  }
});
module.exports = databaseconnection;
