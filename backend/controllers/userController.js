const userModel = require("../models/userModel");
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Validation Functions
const isValid = (value) => {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequestBody = (value) => {
  return Object.keys(value).length > 0;
};

//ROUTE 1:   http://localhost:3000/api/auth/register  POST(Create user)
let createUser = async (req, res) => {
  try {
    const requestBody = req.body;

   // Validation starts
    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({ msg: "Please enter user details" });
    }

    //extract params
    const { name, email, password } = requestBody;

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

    //validation ends
    const hashpw = await bcrypt.hash(password, 10);
    //Validation ends
    const data = { name, email, password: hashpw };

    const userData = await userModel.create(data);
    return res.status(201).send({ data: userData });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

//ROUTE 2:   http://localhost:3000/api/auth/login GET(Login User)

let loginUser = async (req, res) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      return res.status(400).send({ msg: "Please enter login details" });
    }

    const { email, password } = requestBody;
    if (!isValid(email)) {
      return res.status(400).send({ msg: "Please enter email" });
    }

    if (!isValid(password)) {
      return res.status(400).send({ msg: "Please enter password" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({ msg: "No user found with provided email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, "sameer");

    res.header('auth-token', token)

    return res.status(200).send({ data: { token: token, UserId: user._id } });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

// ROUTE 3: http://localhost:3000/api/auth/getUser GET(Get user details) Login Required
let getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tokenId = req.user;
    if(userId!=tokenId){
      return res.status(401).send({msg:"unauthorized access"})
    }
    const userDetails = await userModel
      .findById(userId)
      .select({ name: 1, email: 1});
    return res.status(200).send({ data: userDetails });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ msg: e.message });
  }
};

module.exports = {createUser, loginUser, getUser}
