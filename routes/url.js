const express = require('express');

const{  handleGenerateShortUrl,handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

const { restrictToLoggedinUserOnly} = require("../middleware/auth");


router.post("/", handleGenerateShortUrl);

router.get("/:analytics/:shortId", handleGetAnalytics);
module.exports = router;