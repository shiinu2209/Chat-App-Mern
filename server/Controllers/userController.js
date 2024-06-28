const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.path : "";
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (user) {
      res.json({ message: "User already exists", status: false });
      return;
    }
    const newUser = await User.create({
      image: image,
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    // const fUser=await User.findOne({
    //   $or: [{ email: email }, { username: username }],
    // });
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "User registered successfully",
      id: newUser._id,
      token,
      username: newUser.username,
      status: true,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ message: "User not found", status: false });
  }
  if (bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "User logged in successfully",
      status: true,
      token,
      username: user.username,
      id: user._id,
    });
  } else {
    res.json({ message: "Invalid credentials", status: false });
  }
};
module.exports = { registerController, loginController };
