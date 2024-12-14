const express = require('express');
const router = express.Router();

const postRoutes = require("./post")
const authRoutes = require("./auth");
const { prueba } = require('../middleware/funcionMiddelware');
router.use('/auth', authRoutes)

router.use(prueba)

router.use('/post', postRoutes)


module.exports = router;
