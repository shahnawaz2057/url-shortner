const express = require("express");
const { query } = require("express-validator");
const validate = require("../middlewares/validateMiddleware");

const {
  getVistedLinkStats,
  getCreateLinkStats,
  getDeleteLinkStats,
} = require("../controllers/statsController");

const router = express.Router();

router.route("/visited").get(getVistedLinkStats);

router
  .route("/created")
  .get([query("userId").optional().isNumeric(), validate], getCreateLinkStats);
router.route("/deleted").get(getDeleteLinkStats);

module.exports = router;
