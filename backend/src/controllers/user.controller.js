const User = require("../model/user");
const UserService = require("../services/admin/user.service");
const ValidateUser = require("../validations/user.validation");
// const passport = require("../middleware/passport.auth.middleware");
const axios = require("axios");
const jwt_decode = require("jwt-decode");

const addUser = async (req, res) => {
  // console.log(req.body);
  if (req.body.googleAccessToken) {
    const decoded = jwt_decode(req.body.googleAccessToken);
    const dBuser = User.findOne({ email: decoded.email });
    if (dBuser) {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      const user = User.create({
        email: decoded.email,
        name: decoded.given_name,
        surname: decoded.family_name,
        googleId: decoded.sub,
      });
      res.json({ user });
    }
  } else {
    const { value, error } = ValidateUser.validateRegister(req.body);
    try {
      const user = await UserService.CreateUser(value);
      // res.json(user);
    } catch (err) {
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else if (err.message === "User already exist") {
        res
          .status(400)
          .json({ message: "User with this email already exists" });
      } else res.status(500).json({ message: "internal server error" });
    }
  }
};

const setRole = async (req, res) => {
  if (!ValidateUser.validateRole(req.body))
    throw new Error("Please specify a valid role ");
  console.log(req.params.userId);
  await UserService.setUserRole(req.params.userId, req.body.role);
  return res.json({ message: "User role set successfully" });
};
const getUserInfo = async (req, res) => {
  const user = await UserService.getUserInfo(req.user._id);
  return res.json(user);
};

const getAdminEvents = async (req, res) => {
  const events = await UserService.getAdminEvents(req.user._id);
  return res.json(events);
};

const getAllBookings = async (req, res) => {
  const bookings = await UserService.getAllBookings(req.user._id);
  return res.json(bookings);
};
module.exports = {
  addUser,
  setRole,
  getUserInfo,
  getAllBookings,
  getAdminEvents,
};
