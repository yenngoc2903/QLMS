const { BorrowBook } = require("../model/borrowBookModel");
const { Book } = require("../model/bookModel");
const { User } = require("../model/userModel");

let borrowBook = (data) => {
     return new Promise(async (resolve, reject) => {
       try {
         const newBorrowBook = new BorrowBook(data);
   
         const savedBorrowBook = await newBorrowBook.save();
         // user này là id
         if (data.user) {
           const user = User.findById(data.user);
           await user.updateOne({ $push: { borrowBooks: savedBorrowBook._id } });
         }
         resolve({
           errCode: 0,
           errMessage: "ok",
         });
       } catch (err) {
         reject(err);
       }
  });
};

let getAllBorrowBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await BorrowBook.find().populate("book").populate("user");
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let editBorrowBook = (data) => {
     return new Promise(async (resolve, reject) => {
       try {
         const borrowBook = await BorrowBook.findById(data._id);
         await borrowBook.updateOne({ $set: data });
   
         resolve({
           errCode: 0,
           message: "Update borrow book succeeds!",
         });
       } catch (err) {
         reject(err);
       }
     });
   };

let deleteBorrowBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.updateMany({ borrowBook: id }, { borrowBook: null });
      await BorrowBook.findByIdAndDelete(id);

      resolve({
        errCode: 0,
        message: "Delete borrow book succeeds!",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  borrowBook: borrowBook,
  getAllBorrowBook: getAllBorrowBook,
  deleteBorrowBook: deleteBorrowBook,
  editBorrowBook: editBorrowBook,
};
