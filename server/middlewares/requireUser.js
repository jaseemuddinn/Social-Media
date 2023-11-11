const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    // return res.status(401).json({ message: "No token provided" });
    return res.send(error(401, "Authorization header required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  console.log(accessToken);

  try {
    // console.log("validating");
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req._id = decoded._id;
    // console.log("validated", decoded);
    const user = await User.findById(req._id)
    if(!user){
      return res.send(error(404, 'user not found'))
    }
    next();
  } catch (e) {
    console.log("error while validation", e.message);
    // return res.status(401).json({ message: "Invalid token" });
    return res.send(error(401, "invalid_access_token"));
  }

  //next();
};
