const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const bcrypt = require('bcrypt')

//Validation Functions
const isValid = (value) => {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequestBody = (value) => {
  return Object.keys(value).length > 0;
};

// http://localhost:3000/api/auth/register  POST(Create user)
router.post("/", async (req, res) => {
  try {
    const requestBody = req.body;
    const { name, email, password } = requestBody;

     //Validation starts
    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({ msg: "Please enter user details" });
    }

    if (!isValid(name)) {
      return res.status(400).send({ msg: "Please enter name" });
    }

    if (!isValid(email)) {
      return res.status(400).send({ msg: "Please enter email" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ status: false, Message: "Please provide valid email" });
    }

    if (!isValid(password)) {
      return res.status(400).send({ msg: "Please enter password" });
    }


    const hashpw = await bcrypt.hash(password, 10)
    //Validation ends
    const data = { name, email, password:hashpw };

    const userData = await userModel.create(data);
    return res.send({ data: userData });
  } catch (e) {
    return res.send({ error: e.message });
  }
});

module.exports = router;
