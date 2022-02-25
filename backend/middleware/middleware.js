const jwt = require("jsonwebtoken");

const midware = async (req, res, next) => {
  let token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ msg: "Please authenticate using valid token" });
  }

  try {
    const decodedToken = jwt.verify(token, "sameer");
    req.user = decodedToken.userId;
    next();
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .send({ msg: "Please authenticate using valid token" });
  }
};

module.exports = {midware}