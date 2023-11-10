const express = require("express");

const { redirectToOriginalUrl } = require("../controllers/redirectController");

const router = express.Router();

router.route("/:shortUrl").get(redirectToOriginalUrl);

module.exports = router;
