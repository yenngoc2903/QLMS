const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
     type: String,
     required: true,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

let Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = { Publisher };
