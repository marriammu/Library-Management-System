const borrowingdb = require("../models/borrowingModel");
const booksdb = require("../models/bookModel");
const borrowerbd = require("../models/borrowerModel");

const excel = require("exceljs");

exports.getBorrowingProcessReport = (req, res) => {
  const { startDate, endDate } = req.query;
  let borrowingData = [];

  const selectBorrowingDataQuery = `SELECT borrowers.name AS borrowerName, books.title AS bookTitle, DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) AS borrowingDate
  FROM borrowings JOIN borrowers 
  ON borrowings.borrowerId = borrowers.id
  JOIN books 
  ON borrowings.bookId = books.id
  WHERE DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) >= ? AND DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) <= ?
`;

  borrowingdb.query(
    selectBorrowingDataQuery,
    [startDate, endDate],
    (error, results) => {
      if (error) {
        return res
          .status(res.statusCode)
          .json({ error: "Error fetching borrowing process data" });
      }

      borrowingData = results;

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Borrowing Process");

      worksheet.columns = [
        { header: "Borrower Name", key: "borrowerName" },
        { header: "Book Title", key: "bookTitle" },
        { header: "Borrowing Date", key: "borrowingDate" },
      ];

      worksheet.addRows(borrowingData);

      workbook.xlsx
        .writeFile("BorrowingProcessReport.xlsx")
        .then(() => {
          res.download("BorrowingProcessReport.xlsx");
        })
        .catch((error) => {
          res.status(res.statusCode).json({ error: "Error exporting Excel" });
        });
    }
  );
};
exports.getBorrowingProcessLastMonth = (req, res) => {
  let borrowingData = [];

  const selectBorrowingDataQuery = `SELECT borrowers.name AS borrowerName, books.title AS bookTitle, DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) AS borrowingDate
  FROM borrowings JOIN borrowers 
  ON borrowings.borrowerId = borrowers.id
  JOIN books 
  ON borrowings.bookId = books.id
  WHERE DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) >= DATE_SUB(NOW(), INTERVAL 1 MONTH)  AND DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) <= NOW()
`;

  borrowingdb.query(selectBorrowingDataQuery, (error, results) => {
    if (error) {
      return res
        .status(res.statusCode)
        .json({ error: "Error fetching borrowing process data" });
    }

    borrowingData = results;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(" Borrowing Process");

    worksheet.columns = [
      { header: "Borrower Name", key: "borrowerName" },
      { header: "Book Title", key: "bookTitle" },
      { header: "Borrowing Date", key: "borrowingDate" },
    ];

    worksheet.addRows(borrowingData);

    workbook.xlsx
      .writeFile("BorrowingProcessLastMonth.xlsx")
      .then(() => {
        res.download("BorrowingProcessLastMonth.xlsx");
      })
      .catch((error) => {
        res.status(res.statusCode).json({ error: "Error exporting Excel" });
      });
  });
};
exports.getOverdueLastMonth = (req, res) => {
  let overdueData = [];

  const selectOverdueDataQuery = `SELECT borrowers.name AS borrowerName, books.title AS bookTitle, borrowings.dueDate AS dueDate
  FROM borrowings JOIN borrowers 
  ON borrowings.borrowerId = borrowers.id
  JOIN books 
  ON borrowings.bookId = books.id
  WHERE borrowings.dueDate < NOW() AND returnDate IS NULL AND DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) >= DATE_SUB(NOW(), INTERVAL 1 MONTH) 
  AND DATE_SUB(borrowings.dueDate, INTERVAL 7 DAY) <= NOW()
`;

  borrowingdb.query(selectOverdueDataQuery, (error, results) => {
    if (error) {
      return res
        .status(res.statusCode)
        .json({ error: "Error fetching borrowing process data" });
    }

    overdueData = results;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(" Borrowing Process");

    worksheet.columns = [
      { header: "Borrower Name", key: "borrowerName" },
      { header: "Book Title", key: "bookTitle" },
      { header: "Due Date", key: "dueDate" },
    ];

    worksheet.addRows(overdueData);

    workbook.xlsx
      .writeFile("OverdueLastMonth.xlsx")
      .then(() => {
        res.download("OverdueLastMonth.xlsx");
      })
      .catch((error) => {
        res.status(res.statusCode).json({ error: "Error exporting Excel" });
      });
  });
};
