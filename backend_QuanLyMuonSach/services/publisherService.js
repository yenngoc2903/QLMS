const { Publisher } = require("../model/PublisherModel");
const { Book } = require("../model/bookModel");

let createPublisher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPublisher = new Publisher(data);
      await newPublisher.save();
      resolve({
        errCode: 0,
        errMessage: "ok",
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getAllPublisher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Publisher.find().populate("books");
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

let getDetailPublisherById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required param !",
        });
      } else {
        const publisher = await Publisher.findById(inputId).populate("books");
        resolve({
          errCode: 0,
          errMessage: "ok!",
          data: publisher,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editPublisher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const publisher = await Publisher.findById(data._id);
      await publisher.updateOne({ $set: data });

      resolve({
        errCode: 0,
        message: "Update Publisher succeeds!",
      });
    } catch (err) {
      reject(e);
    }
  });
};

let deletePublisher = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Book.updateMany({ publisher: id }, { publisher: null });
      await Publisher.findByIdAndDelete(id);

      resolve({
        errCode: 0,
        message: "Delete publisher succeeds!",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createPublisher: createPublisher,
  getAllPublisher: getAllPublisher,
  getDetailPublisherById: getDetailPublisherById,
  editPublisher: editPublisher,
  deletePublisher: deletePublisher,
};
