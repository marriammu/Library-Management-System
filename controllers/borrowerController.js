
const borrowersdb = require("../models/borrowerModel");

exports.registerBorrower = (req, res) => {

  const { name,address, email } = req.body;
  const query =
    "INSERT INTO borrowers (name, address,email, registeredDate) VALUES (?, ?,?, NOW())";
  borrowersdb.query(query, [name,address, email], (error, results) => {
    if (error) {
      res.status(res.statusCode).json({ error: "Error registering borrower" });
    } else {
      res.status(res.statusCode).json({
        message: "Borrower registered successfully",
      });
    }
  });
};
exports.updateBorrower = (req, res) => {
  const borrowerId = req.params.id;
  const { name,address, email } = req.body;
  const query =
    "UPDATE borrowers SET name=?, address=?,email=? WHERE id=?";
  borrowersdb.query(
    query,
    [name,address, email, borrowerId],
    (error) => {
      if (error) {
        res.status(res.statusCode).json({ error: "Error updating borrower" });
      } else {
        res.status(res.statusCode).json({ message: "Borrower updated successfully" });
      }
    }
  );
};
exports.deleteBorrower = (req, res) => {
  const borrowerId = req.params.id;
  const query = "DELETE FROM borrowers WHERE id=?";
  borrowersdb.query(query, [borrowerId], (error) => {
    if (error) {
      res.status(res.statusCode).json({ error: "Error deleting borrower" });
    } else {
      res.status(res.statusCode).json({ message: "Borrower deleted successfully" });
    }
  });
};
exports.getAllBorrowers = (req, res) => {
  const query = "SELECT * FROM borrowers";
  borrowersdb.query(query, (error, results) => {
    if (error) {
      res.status(res.statusCode).json({ error: "Error fetching borrowers" });
    } else {
      res.status(res.statusCode).json(results);
    }
  });
};
