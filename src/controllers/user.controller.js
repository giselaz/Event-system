const User = require("../model/user");
const UserService = require("../services/admin/user.service");
const ValidateUser = require("../validations/user.validation");

const addUser = async (req, res) => {
  if (!ValidateUser.validateRegister(req.body))
    throw new Error("Please enter valid data");
  const user = await UserService.CreateUser(req.body);
  if (!user) {
    res.status(409).send("Email already in use");
  }
  res.json({ user: user });
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
