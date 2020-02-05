const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const login = req.body.login;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      login: login,
      password: hashedPw
    });
    const result = await user.save();
    res.status(201).json({ message: "User created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const login = req.body.login;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ login: login });
    if (!user) {
      const error = new Error("A user with this login could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        login: loadedUser.login,
        userId: loadedUser._id.toString()
      },
      "qa34552vxrclap9gzcn1SaAf0",
      { expiresIn: "5h" }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      expirationDate: jwt.decode(token).exp * 1000
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
