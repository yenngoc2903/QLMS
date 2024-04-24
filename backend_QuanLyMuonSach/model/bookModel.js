const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
  },
  author: {
    type: String,
    required: true,
  },
  img: {
     type: String,
     required: true
  }
});

let Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
