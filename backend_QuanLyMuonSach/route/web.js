const express = require("express");
const bookController = require("../controllers/bookController");
const publisherController = require("../controllers/publisherController");
const userController = require("../controllers/userController");
const borrowBookController = require("../controllers/borrowBookController");

let router = express.Router();

let initWebRoutes = (app) => {
  // book
  router.post("/api/create-book", bookController.handleCreateBook);
  router.get("/api/get-all-book", bookController.handleGetAllBook);
  router.get(
    "/api/get-detail-book-by-id/:id",
    bookController.getDetailBookById
  );
  router.put("/api/edit-book", bookController.handleEditBook);
  router.delete("/api/delete-book/:id", bookController.handleDeleteBook);

  // publisher
  router.post(
    "/api/create-publisher",
    publisherController.handleCreatePublisher
  );
  router.get(
    "/api/get-all-publisher",
    publisherController.handleGetAllPublisher
  );
  router.get(
    "/api/get-detail-publisher-by-id/:id",
    publisherController.getDetailPublisherById
  );
  router.put("/api/edit-publisher", publisherController.handleEditPublisher);
  router.delete(
    "/api/delete-publisher/:id",
    publisherController.handleDeletePublisher
  );

  // user
  router.post("/api/user-register", userController.handleUserRegister);
  router.post("/api/user-login", userController.handleUserLogin);
  router.post("/api/create-user", userController.handleCreateUser);
  router.get("/api/get-all-user", userController.handleGetAllUser);
  router.get(
    "/api/get-detail-user-by-id/:id",
    userController.getDetailUserById
  );
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user/:id", userController.handleDeleteUser);

  // borrow book
  router.post("/api/borrow-book", borrowBookController.handleBorrowBook);
  router.get(
    "/api/get-all-borrow-book",
    borrowBookController.handleGetBorrowBook
  );
  router.put(
     "/api/edit-borrow-book",
     borrowBookController.handleEditBorrowBook
   );
  router.delete(
    "/api/delete-borrow-book/:id",
    borrowBookController.handleDeleteBorrowBook
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
