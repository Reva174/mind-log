const Entry = require("../models/Entry");

// Create entry
exports.createEntry = async (req, res) => {
  const { content, isLocked } = req.body;
  const entry = await Entry.create({
    user: req.user._id,
    content,
    isLocked: Boolean(isLocked) 
  });
  res.status(201).json(entry);
};


// Get all entries (non-locked for now)
exports.getEntries = async (req, res) => {
  const entries = await Entry.find({ user: req.user._id })
    .sort({ createdAt: -1 });
  res.json(entries);
};

exports.getLockedEntries = async (req, res) => {
  const entries = await Entry.find({
    user: req.user._id,
    isLocked: true
  }).sort({ createdAt: -1 });

  res.json(entries);
};

// Delete entry
exports.deleteEntry = async (req, res) => {
  await Entry.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });
  res.json({ message: "Entry deleted" });
};
