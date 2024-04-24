const borrowBookService = require("../services/borrowBookService");

let handleBorrowBook = async (req, res) => {
  let message = await borrowBookService.borrowBook(req.body);
  return res.status(200).json(message);
};

let handleGetBorrowBook = async (req, res) => {
  let message = await borrowBookService.getAllBorrowBook(req.body);
  return res.status(200).json(message);
};

let handleEditBorrowBook = async (req, res) => {
     let message = await borrowBookService.editBorrowBook(req.body);
     return res.status(200).json(message);
   };

let handleDeleteBorrowBook = async (req, res) => {
     console.log(req.params.id);
  if (!req.params.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await borrowBookService.deleteBorrowBook(req.params.id);
  return res.status(200).json(message);
};

module.exports = {
  handleBorrowBook: handleBorrowBook,
  handleGetBorrowBook: handleGetBorrowBook,
  handleDeleteBorrowBook: handleDeleteBorrowBook,
  handleEditBorrowBook: handleEditBorrowBook
};
