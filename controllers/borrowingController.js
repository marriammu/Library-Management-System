const borrowingdb = require("../models/borrowingModel");
const booksdb = require("../models/bookModel");
const borrowerbd = require("../models/borrowerModel");

exports.bookCheckout = (req, res) => {
  const { borrowerId, bookId } = req.body;
  if (!Number.isInteger(borrowerId) || !Number.isInteger(bookId)) {
    return res.status(res.statusCode).json({ error: "Invalid input format" });
  }

  const checkAvailabilityQuery =
    "SELECT availableQuantity FROM books WHERE id=?";
  booksdb.query(checkAvailabilityQuery, [bookId], (error, results) => {
    if (error) {
      res
        .status(res.statusCode)
        .json({ error: "Error checking book availability" });
    } else {
      const availableQuantity = results[0].availableQuantity;
      if (availableQuantity > 0) {
        const updateBookQuery =
          "UPDATE books SET availableQuantity = availableQuantity - 1 WHERE id=?";
        booksdb.query(updateBookQuery, [bookId], (error) => {
          if (error) {
            res
              .status(res.statusCode)
              .json({ error: "Error updating book availability" });
          } else {
            const recordBorrowingQuery =
              "INSERT INTO borrowings (borrowerId, bookId, dueDate) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))";
            borrowingdb.query(
              recordBorrowingQuery,
              [borrowerId, bookId],
              (error) => {
                if (error) {
                  res
                    .status(res.statusCode)
                    .json({ error: "Error recording borrowing information" });
                } else {
                  res
                    .status(res.statusCode)
                    .json({ message: "Book checked out successfully" });
                }
              }
            );
          }
        });
      } else {
        res
          .status(res.statusCode)
          .json({ error: "Book not available for checkout" });
      }
    }
  });
};
exports.bookReturn = (req, res) => {
  const { borrowerId, bookId } = req.body;

  if (!Number.isInteger(borrowerId) || !Number.isInteger(bookId)) {
    return res.status(res.statusCode).json({ error: "Invalid input format" });
  }

  const checkBorrowingQuery =
    "SELECT * FROM borrowings WHERE borrowerId=? AND bookId=? AND returnDate IS NULL";

  borrowingdb.query(
    checkBorrowingQuery,
    [borrowerId, bookId],
    (error, results) => {
      if (error) {
        return res
          .status(res.statusCode)
          .json({ error: "Error checking borrowing information" });
      }

      if (results.length === 0) {
        return res
          .status(res.statusCode)
          .json({ error: "No active borrowing record found" });
      }

      const updateBookQuery =
        "UPDATE books SET availableQuantity = availableQuantity + 1 WHERE id=?";
      booksdb.query(updateBookQuery, [bookId], (error) => {
        if (error) {
          return res
            .status(res.statusCode)
            .json({ error: "Internal Server Error" });
        }

        const recordReturnQuery =
          "UPDATE borrowings SET returnDate = NOW() WHERE borrowerId=? AND bookId=? AND returnDate IS NULL";
        borrowingdb.query(recordReturnQuery, [borrowerId, bookId], (error) => {
          if (error) {
            return res
              .status(res.statusCode)
              .json({ error: "Internal Server Error" });
          }

          res
            .status(res.statusCode)
            .json({ message: "Book returned successfully" });
        });
      });
    }
  );
};

exports.bookBorrowed = (req, res) => {
  const borrowerId = req.params.id;

  const getCheckedOutBooksQuery = `
    SELECT  books.title, books.author, books.ISBN, borrowings.dueDate
    FROM books JOIN borrowings 
    ON books.id = borrowings.bookId
    WHERE borrowings.borrowerId = ? AND borrowings.returnDate IS NULL
  `;
  borrowingdb.query(getCheckedOutBooksQuery, [borrowerId], (error, results) => {
    if (error) {
      res
        .status(res.statusCode)
        .json({ error: "Error fetching checked out books" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
exports.bookOverdue = (req, res) => {
  const getOverdueBooksQuery = `
    SELECT books.title, books.author, books.ISBN, borrowings.dueDate
    FROM books JOIN borrowings 
    ON books.id = borrowings.bookId
    WHERE borrowings.dueDate < NOW() AND borrowings.returnDate IS NULL
  `;
  borrowingdb.query(getOverdueBooksQuery, (error, results) => {
    if (error) {
      res
        .status(res.statusCode)
        .json({ error: "Error fetching overdue books" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
