const User = require("./userModel");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Fields validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, Email and Password are required",
      success: false,
    });
  }

  // User already exists

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while checking user", success: false });
  }

  let newUser;
  try {
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating user", success: false });
  }

  try {
    // Token Generation
    const token = sign({ sub: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // Response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While generating token", success: false });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Fields validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required",
      success: false,
    });
  }

  let user;

  try {
    user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect", success: false });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while checking user", success: false });
  }

  try {
    // Password validation
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while checking password", success: false });
  }

  try {
    // Token Generation
    const token = sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // Response
    res.status(200).json({
      accessToken: token,
      success: true,
      plan: user.plan,
      user: user._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While generating token", success: false });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id.toString();
    const newUser = await User.findById(userId);

    if (!newUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    console.log("User ", newUser);
    // dont send password in response
    newUser.password = undefined;
    return res.status(200).json({ user: newUser, success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while fetching user", success: false });
  }
};

module.exports = { createUser, loginUser, getUserById };
