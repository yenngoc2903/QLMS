const bookService = require("../services/bookService");

let handleCreateBook = async (req, res) => {
  let message = await bookService.createBook(req.body);
  return res.status(200).json(message);
};

let handleGetAllBook = async (req, res) => {
  let message = await bookService.getAllBook(req.body);
  return res.status(200).json(message);
};

let getDetailBookById = async (req, res) => {
  try {
    let infor = await bookService.getDetailBookById(req.params.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleEditBook = async (req, res) => {
  let message = await bookService.editBook(req.body);
  return res.status(200).json(message);
};

let handleDeleteBook = async (req, res) => {
  console.log(req.params.id);
  if (!req.params.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deleteBook(req.params.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateBook: handleCreateBook,
  handleGetAllBook: handleGetAllBook,
  getDetailBookById: getDetailBookById,
  handleEditBook: handleEditBook,
  handleDeleteBook: handleDeleteBook,
};
