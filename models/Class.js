const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    unique: true,
    maxlength: [40, "Title is too big!(Maximum 40 chars)"],
  },
  description: {
    type: String,
    required: [true],
    maxlength: [120, "Description is too big!(Maximum 120 chars)"],
  },
  content: {
    type: String,
    required: true,
  },
  placeholderCode: {
    type: String,
    required: true,
  },
  successCodes: [String],
  category: { type: "ObjectId", ref: "Category", required: true },
  classLink: { type: "ObjectId", ref: "Class" },
});

module.exports = mongoose.models.Class || mongoose.model("Class", ClassSchema);
