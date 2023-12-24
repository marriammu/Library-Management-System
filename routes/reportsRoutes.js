const express = require('express');
const reportsController = require("../controllers/reportsController");
const router = express.Router();


router.get("/borrowing-process/", reportsController.getBorrowingProcessReport)
router.get("/borrowing-process-last-month/", reportsController.getBorrowingProcessLastMonth)
router.get("/overdue-last-month/", reportsController.getOverdueLastMonth)



module.exports = router;
