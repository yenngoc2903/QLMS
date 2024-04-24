const { Publisher } = require("../model/PublisherModel");
const { Book } = require("../model/bookModel");

let createBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBook = new Book(data);
      const savedBook = await newBook.save();
      // publisher này là id
      if (data.publisher) {
        const publisher = Publisher.findById(data.publisher);
        await publisher.updateOne({ $push: { books: savedBook._id } });
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

let getAllBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Book.find();
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (err) {
      reject(e);
    }
  });
};

let getDetailBookById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        const book = await Book.findById(inputId).populate("publisher");
        resolve({
          errCode: 0,
          errMessage: "ok!",
          data: book,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const book = await Book.findById(data._id);
      await book.updateOne({ $set: data });

      resolve({
        errCode: 0,
        message: "Update book succeeds!",
      });
    } catch (err) {
      reject(e);
    }
  });
};

let deleteBook = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Publisher.updateMany({ books: id }, { $pull: { books: null } });
      await Book.findByIdAndDelete(id);

      resolve({
        errCode: 0,
        message: "Delete book succeeds!",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createBook: createBook,
  getAllBook: getAllBook,
  getDetailBookById: getDetailBookById,
  editBook: editBook,
  deleteBook: deleteBook,
};
