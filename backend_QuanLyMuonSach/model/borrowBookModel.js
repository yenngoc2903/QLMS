const mongoose = require("mongoose");

const borrowBookSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isActive: {
     type:Boolean,
     default: false,
  },
  borrowDate: {
    type: Date,
    default: new Date(),
  },
  returnDate: {
    type: Date,
    required: true,
  },
});

let BorrowBook = mongoose.model("BorrowBook", borrowBookSchema);

module.exports = { BorrowBook };
