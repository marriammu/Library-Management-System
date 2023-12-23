const express = require("express");
const borrowingProcessController = require("../controllers/borrowingController");
const router = express.Router();

router.post("/checkout", borrowingProcessController.bookCheckout);

router.post("/return", borrowingProcessController.bookReturn);

router.get("/borrowers/:id/books", borrowingProcessController.bookBorrowed);

router.get("/overdue", borrowingProcessController.bookOverdue);

module.exports = router;
