const express = require("express");
const authController = require("./../controllers/authController");
const siteController = require("./../Controllers/siteReportController");

const router = express.Router();

router
  .route("/")
  .post(siteController.createSiteReport)
  .get(siteController.getsitereports);

router.get("/search", siteController.searchreport);

router
  .route("/:id")
  .patch(siteController.updatereport)
  .get(siteController.getsitesinglereport)
  .delete(siteController.deletereport);
// router.get("/:id/pdf", siteController.createPDFReport);
module.exports = router;
