const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  enablePrivateSpace,
  verifyPin
} = require("../controllers/privateController");
const { markAuthorNoteSeen } = require("../controllers/privateController");

const router = express.Router();

router.use(protect);

router.post("/enable", enablePrivateSpace);
router.post("/verify", verifyPin);
router.post("/mark-author-note-seen", markAuthorNoteSeen);

module.exports = router;
