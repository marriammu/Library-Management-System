const borrowingdb = require("../models/borrowingModel");
const booksdb = require("../models/bookModel");

exports.bookCheckout = (req, res) => {
  console.log("bookCheckout");
  const { borrowerId, bookId } = req.body;
  if (!Number.isInteger(borrowerId) || !Number.isInteger(bookId)) {
    return res.status(res.statusCode).json({ error: "Invalid input format" });
  }

  const checkAvailabilityQuery =
    "SELECT availableQuantity FROM books WHERE id=?";
  booksdb.query(checkAvailabilityQuery, [bookId], (error, results) => {
    if (error) {
      console.error("Error checking book availability:", error);
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
            console.error("Error updating book availability:", error);
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
                  console.error(
                    "Error recording borrowing information:",
                    error
                  );
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
  console.log("bookReturn");
  const { borrowerId, bookId } = req.body;
  if (!Number.isInteger(borrowerId) || !Number.isInteger(bookId)) {
    return res.status(res.statusCode).json({ error: "Invalid input format" });
  }

  const updateBookQuery =
    "UPDATE books SET availableQuantity = availableQuantity + 1 WHERE id=?";
  booksdb.query(updateBookQuery, [bookId], (error) => {
    if (error) {
      console.error("Error updating book availability:", error);
      res
        .status(res.statusCode)
        .json({ error: "Error updating book availability" });
    } else {
      const recordReturnQuery =
        "UPDATE borrowings SET returnDate = NOW() WHERE borrowerId=? AND bookId=? AND returnDate IS NULL";
      borrowingdb.query(recordReturnQuery, [borrowerId, bookId], (error) => {
        if (error) {
          console.error("Error recording return information:", error);
          res
            .status(res.statusCode)
            .json({ error: "Error recording return information" });
        } else {
          res
            .status(res.statusCode)
            .json({ message: "Book returned successfully" });
        }
      });
    }
  });
};

exports.bookBorrowed = (req, res) => {
  console.log("bookBorrowed");
  const borrowerId = req.params.id;

  const getCheckedOutBooksQuery = `
    SELECT  books.title, books.author, books.ISBN, borrowings.dueDate
    FROM books JOIN borrowings 
    ON books.id = borrowings.bookId
    WHERE borrowings.borrowerId = ? AND borrowings.returnDate IS NULL
  `;
  borrowingdb.query(getCheckedOutBooksQuery, [borrowerId], (error, results) => {
    if (error) {
      console.error("Error fetching checked out books:", error);
      res
        .status(res.statusCode)
        .json({ error: "Error fetching checked out books" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
exports.bookOverdue = (req, res) => {
  console.log("bookOverdue");
  const getOverdueBooksQuery = `
    SELECT books.title, books.author, books.ISBN, borrowings.dueDate
    FROM books JOIN borrowings 
    ON books.id = borrowings.bookId
    WHERE borrowings.dueDate < NOW() AND borrowings.returnDate IS NULL
  `;
  borrowingdb.query(getOverdueBooksQuery, (error, results) => {
    if (error) {
      console.error("Error fetching overdue books:", error);
      res
        .status(res.statusCode)
        .json({ error: "Error fetching overdue books" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};