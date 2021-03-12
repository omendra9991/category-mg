const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/publicAPI");

let routes = app => {
  router.get("/listCat", uploadController.getCategory);
  router.get("/listCat/:id", uploadController.getCategorywithID);
  router.post("/multiple-upload", uploadController.multipleUpload);
  router.delete("/delCat/:id", uploadController.delCategory);
  router.put("/updateCat/:id", uploadController.updateCategory);
  return app.use("/", router);
};

module.exports = routes;