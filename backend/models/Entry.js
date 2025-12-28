const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      default: ""
    },

    content: {
      type: String,
      required: true
    },

    emotion: {
      type: String,
      default: "neutral"
    },

    pageStyle: {
      type: String,
      enum: ["lined", "blank"],
      default: "blank"
    },

    font: {
      type: String,
      default: "serif"
    },

    themeOverride: {
      type: String,
      enum: ["light", "dark"],
      default: null
    },

    isLocked: {
      type: Boolean,
      default: false
    },

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
