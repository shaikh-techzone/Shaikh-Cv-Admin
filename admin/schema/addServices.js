const mongoose = require("mongoose");

const AddServices = new mongoose.Schema(
  {
    ServiceName: { type: String, required: true },
    ServiceDesc: { type: String, required: true },
  },
  {
    collection: "Services",
    timestamps: true,
  }
);

const model = mongoose.model("AddServices", AddServices);

module.exports = model;
