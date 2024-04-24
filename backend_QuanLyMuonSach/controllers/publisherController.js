const publisherService = require("../services/publisherService");

let handleCreatePublisher = async (req, res) => {
  let message = await publisherService.createPublisher(req.body);
  return res.status(200).json(message);
};

let handleGetAllPublisher = async (req, res) => {
  let message = await publisherService.getAllPublisher(req.body);
  return res.status(200).json(message);
};

let getDetailPublisherById = async (req, res) => {
  try {
    let infor = await publisherService.getDetailPublisherById(req.params.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleEditPublisher = async (req, res) => {
  let message = await publisherService.editPublisher(req.body);
  return res.status(200).json(message);
};

let handleDeletePublisher = async (req, res) => {
     console.log(req.params.id);     
  if (!req.params.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await publisherService.deletePublisher(req.params.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreatePublisher: handleCreatePublisher,
  handleGetAllPublisher: handleGetAllPublisher,
  getDetailPublisherById: getDetailPublisherById,
  handleEditPublisher: handleEditPublisher,
  handleDeletePublisher: handleDeletePublisher,
};
