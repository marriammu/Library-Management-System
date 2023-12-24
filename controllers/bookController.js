const booksdb = require("../models/bookModel");
exports.addBook = (req, res) => {
  const { title, author, ISBN, availableQuantity, shelfLocation } = req.body;
  const query =
    "INSERT INTO books (title, author, ISBN, availableQuantity, shelfLocation) VALUES (?, ?, ?, ?, ?)";
  booksdb.query(
    query,
    [title, author, ISBN, availableQuantity, shelfLocation],
    (error, results) => {
      if (error) {
        res.status(res.statusCode).json({ error: err.message });
      } else {
        res.status(res.statusCode).json({
          message: "Book added successfully",
          bookId: results.insertId,
        });
      }
    }
  );
};
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const { title, author, ISBN, availableQuantity, shelfLocation } = req.body;
  const query =
    "UPDATE books SET title=?, author=?, ISBN=?, availableQuantity=?, shelfLocation=? WHERE id=?";
  booksdb.query(
    query,
    [title, author, ISBN, availableQuantity, shelfLocation, bookId],
    (error) => {
      if (error) {
        res.status(res.statusCode).json({ error: "Error updating book" });
      } else {
        res
          .status(res.statusCode)
          .json({ message: "Book updated successfully" });
      }
    }
  );
};
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id=?";
  booksdb.query(query, [bookId], (error) => {
    if (error) {
      res.status(res.statusCode).json({ error: "Error deleting book" });
    } else {
      res.status(res.statusCode).json({ message: "Book deleted successfully" });
    }
  });
};
exports.getAllBooks = (req, res) => {
  const query = "SELECT * FROM books";
  booksdb.query(query, (error, results) => {
    if (error) {
      res.status(res.statusCode).json({ error: "Error fetching books" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
exports.searchBook = (req, res) => {
  const { title, author, ISBN } = req.query;
  const query =
    "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR ISBN LIKE ?";

  booksdb.query(
    query,
    [`%${title}%`, `%${author}%`, `%${ISBN}%`],
    (error, results) => {
      if (error) {
        res.status(res.statusCode).json({ error: "Error searching for book" });
      } else {
        res.status(res.statusCode).json(results);
      }
    }
  );
};
