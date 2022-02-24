const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel")

// http://localhost:3000/api/auth  POST(Create user)
router.post('/', async (req, res) => {

    const requestBody = req.body
    const userData = await userModel.create(requestBody)

    res.send({data: userData})

})

module.exports = router
