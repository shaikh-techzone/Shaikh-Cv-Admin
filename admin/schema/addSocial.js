const mongoose = require("mongoose");

const AddSocial = new mongoose.Schema(
  {
    Facebook: { type: String, required: true },
    Instagram: { type: String, required: true },
    LinkedIn: { type: String, required: true },
    Github: { type: String, required: true },
  },
  {
    collection: "Social",
    timestamps: true,
  }
);

const model = mongoose.model("AddSocial", AddSocial);

module.exports = model;
