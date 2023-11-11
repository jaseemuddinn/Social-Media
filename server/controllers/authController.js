const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      // return res.status(400).send("Please provide email and password");
      return res.send(error(400, "mail and password are required"))
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      // return res.status(400).send("User already exists");
      return res.send(error(409, "user already exists"))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await User.findById(user._id);
    // return res.status(201).json({
    //   user,
    // });
    return res.send(success(201, user, {
      message: "User created Successfully!"
    }));
  } catch (e) {
    return res.send(error(500, e.message))
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res.status(400).send("Please provide email and password");
      return res.send(error(400, "mail and password are required"))
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // return res.status(400).send("User not found");
      return res.send(error(404, "user not found"))
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // return res.status(400).send("Invalid password");
      return res.send(error(403, "invalid password"))
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
    })

    return res.send(success(200, {
      accessToken,
    }))
  } catch (e) {
    return res.send(error(500, e.message))
  }
};


const logoutController = async (req, res)=>{
  try {
     res.clearCookie('jwt', {
      httpOnly: true,
      secure: true
     })
     return res.send(success(200, 'user logged out'))
  } catch (e) {
    return res.send(error(500, e.message))
  }
}

//this api will check the refreshToken Validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
  // const { refreshToken } = req.body;
  const cookies = req.cookies;
  if(!cookies.jwt){
    // return res.status(400).send("refresh token in cookie is required");
    return res.send(error(401, "refresh token in cookie is required"))
  }

  const refreshToken = cookies.jwt;
  // console.log(refreshToken);

  try {
    const decoded = jwt.verify(
      refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY
    )

    const _id = decoded._id;
    const accessToken = generateAccessToken({_id});
    return res.send(success(201, {
      accessToken,
    }))

  } catch (e) {
    console.log(e)
    // return res.status(401).send({message: 'Invalid Refresh Token'})
    return res.send(error(401, 'Invalid Refresh Token'))
  }
};

//internal function
const  generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (e) {
    return res.send(error(500, e.message))
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (e) {
    return res.send(error(500, e.message))
  }
};

module.exports = {
  logoutController,
  signupController,
  loginController,
  refreshAccessTokenController,
};
