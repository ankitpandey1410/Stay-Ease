const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

async function handleUserRegister(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(name);
    if (!name || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "This user is already registered!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
      userDoc,
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleUserLogIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(404).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, userDoc.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    jwt.sign(
      { email: userDoc.email, id: userDoc._id },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function handleUserLogOut(req, res) {
  try {
    return res.status(200).cookie("token", "").json({
      message: "User logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleUserProfile(req, res) {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleUserRegister,
  handleUserLogIn,
  handleUserLogOut,
  handleUserProfile,
};
