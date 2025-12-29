const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Enable private space (set trigger + PIN)
exports.enablePrivateSpace = async (req, res) => {
  const { trigger, pin } = req.body;

  if (!trigger || !pin || pin.length < 4) {
    return res.status(400).json({ message: "Invalid trigger or PIN" });
  }

  const pinHash = await bcrypt.hash(pin, 10);

  req.user.privateSpace = {
    enabled: true,
    trigger: trigger.toLowerCase(),
    pinHash,
    hasSeenAuthorNote: false
  };

  await req.user.save();
  res.json({ message: "Private space enabled" });
};

// Verify PIN
exports.verifyPin = async (req, res) => {
  const { pin } = req.body;

  if (!req.user.privateSpace.enabled) {
    return res.status(400).json({ message: "Private space not enabled" });
  }

  const isValid = await bcrypt.compare(
    pin,
    req.user.privateSpace.pinHash
  );

  if (!isValid) {
    return res.status(401).json({ message: "Invalid PIN" });
  }

  res.json({ success: true });
};

exports.markAuthorNoteSeen = async (req, res) => {
  req.user.privateSpace.hasSeenAuthorNote = true;
  await req.user.save();
  res.json({ success: true });
};
