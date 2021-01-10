const express = require('express');
const router = express.Router();
const {getPrivateData} = require('../controllers/private');
const {protect} = require('../middleware/auth'); //middleware to protect the private route

router.route("/").get(protect, getPrivateData);

module.exports = router;