
const borrowersdb = require("../models/borrowerModel");

exports.registerBorrower = (req, res) => {
  console.log("register Borrower");
  const { name, email } = req.body;
  const query =
    "INSERT INTO borrowers (name, email, registeredDate) VALUES (?, ?, NOW())";
  borrowersdb.query(query, [name, email], (error, results) => {
    if (error) {
      console.error("Error registering borrower:", error);
      res.status(res.statusCode).json({ error: "Internal Server Error" });
    } else {
      res.status(res.statusCode).json({
        message: "Borrower registered successfully",
        borrowerId: results.insertId,
      });
    }
  });
};
exports.updateBorrower = (req, res) => {
  console.log("Update Borrower");
  const borrowerId = req.params.id;
  const { name, email, registeredDate } = req.body;
  const query =
    "UPDATE borrowers SET name=?, email=?, registeredDate=? WHERE id=?";
  borrowersdb.query(
    query,
    [name, email, registeredDate, borrowerId],
    (error) => {
      if (error) {
        console.error("Error updating borrower:", error);
        res.status(res.statusCode).json({ error: "Internal Server Error" });
      } else {
        res.status(res.statusCode).json({ message: "Borrower updated successfully" });
      }
    }
  );
};
exports.deleteBorrower = (req, res) => {
  console.log("delete Borrower");
  const borrowerId = req.params.id;
  const query = "DELETE FROM borrowers WHERE id=?";
  borrowersdb.query(query, [borrowerId], (error) => {
    if (error) {
      console.error("Error deleting borrower:", error);
      res.status(res.statusCode).json({ error: "Internal Server Error" });
    } else {
      res.status(res.statusCode).json({ message: "Borrower deleted successfully" });
    }
  });
};
exports.getAllBorrowers = (req, res) => {
  console.log("get all Borrowers");
  const query = "SELECT * FROM borrowers";
  borrowersdb.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching borrowers:", error);
      res.status(res.statusCode).json({ error: "Internal Server Error" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
