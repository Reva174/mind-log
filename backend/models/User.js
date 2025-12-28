const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    preferences: {
      theme: { type: String, default: "light" },
      font: { type: String, default: "serif" },
      pageStyle: { type: String, default: "blank" },
      fontSize: { type: String, default: "medium" },
      showAuthorNote: { type: Boolean, default: true }
    },

    privateSpace: {
  enabled: { type: Boolean, default: false },
  trigger: { type: String, default: "" },   // secret word
  pinHash: { type: String, default: "" },   // hashed PIN
  hasSeenAuthorNote: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
