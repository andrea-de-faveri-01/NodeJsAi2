const mongoose = require("mongoose");

const devSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  logo: { type: String },
  link: { type: String },
  ais: [{ type: mongoose.Schema.Types.ObjectId, ref: "ais" }],
});

const Dev = mongoose.model("devs", devSchema);
module.exports = Dev;
