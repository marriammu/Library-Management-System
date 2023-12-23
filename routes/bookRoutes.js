const express = require("express");
const bookContoller = require("../controllers/bookController");
const router = express.Router();

router.post("/", bookContoller.addBook);
router.put("/:id", bookContoller.updateBook);
router.delete("/:id", bookContoller.deleteBook);
router.get("/", bookContoller.getAllBooks);
router.get("/search", bookContoller.searchBook);

module.exports = router;
