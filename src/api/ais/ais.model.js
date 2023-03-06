const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      category: [{ 
        type: String,
        required: true,
        enum: ["chatBot", "text to image"],
    }],
      logo: { type: String },
      year: { type: Number },
      lenguage: { type: String },
      description: { type: String, required: true, maxlength: 300 },
      link: { type: String, required: true },
      price: { type: String, required: true }
    },
    {
      timestamps: true,
      collection: "ais"
    }
  );
  
  const Ai = mongoose.model("ais", aiSchema);
  module.exports =  Ai;