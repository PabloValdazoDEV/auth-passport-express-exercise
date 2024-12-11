const express = require('express');
const router = express.Router();

const postRoutes = require("./post")
const authRoutes = require("./auth")

router.use('/post', postRoutes)
router.use('/auth', authRoutes)


module.exports = router;
