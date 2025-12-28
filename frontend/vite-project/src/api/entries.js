import api from "./client";

export const getEntries = (token) =>
  api.get("/api/entries", {
    headers: { Authorization: `Bearer ${token}` },
  });

exports.createEntry = async (req, res) => {
  const entry = await Entry.create({
    user: req.user._id,
    content: req.body.content,
    isLocked: req.body.isLocked || false
  });

  res.status(201).json(entry);
};

exports.getLockedEntries = async (req, res) => {
  const entries = await Entry.find({
    user: req.user._id,
    isLocked: true
  }).sort({ createdAt: -1 });

  res.json(entries);
};


export const deleteEntry = (token, id) =>
  api.delete(`/api/entries/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  exports.getEntries = async (req, res) => {
  const entries = await Entry.find({
    user: req.user._id,
    isLocked: false
  }).sort({ createdAt: -1 });

  res.json(entries);
};
