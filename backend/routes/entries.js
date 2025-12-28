const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createEntry,
  getEntries,
  deleteEntry
} = require("../controllers/entryController");

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getEntries)
  .post(createEntry);

router.route("/:id")
  .delete(deleteEntry);

module.exports = router;
