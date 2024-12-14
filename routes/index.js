const express = require('express');
const router = express.Router();

const postRoutes = require("./post")
const authRoutes = require("./auth");
const { proteccionRuta } = require('../middleware/funcionMiddelware');
router.use('/auth', authRoutes)

router.use(proteccionRuta)

router.use('/post', postRoutes)


module.exports = router;
