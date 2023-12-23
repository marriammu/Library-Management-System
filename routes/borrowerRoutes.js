const express = require("express");
const borrowerContoller = require("../controllers/borrowerController");
const router = express.Router();

router.post("/", borrowerContoller.registerBorrower);
router.put("/:id", borrowerContoller.updateBorrower);
router.delete("/:id", borrowerContoller.deleteBorrower);
router.get("/", borrowerContoller.getAllBorrowers);

module.exports = router;
