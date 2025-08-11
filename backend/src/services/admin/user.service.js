const bcrypt = require("bcrypt");
const User = require("../../model/user");
const Booking = require("../../model/booking");
const Event = require("../../model/event");

const CreateUser = async (user) => {
  if (await User.findOne({ email: user.email })) {
    throw new Error("User already exist"); 
  } else {
    // create user with basic auth username+password
    const salt = await bcrypt.genSalt(10);
    const userDb = new User(
      user
    );
    userDb.password = await bcrypt.hash(user.password, salt);
    const { password, ...responseUser } = userDb._doc;
    userDb
      .save()
      .then(() => {
        console.log("user Created");
      })
      .catch((err) => {
        console.log(err);
      });
    return responseUser;
  }
};
const createGoogleUser = async (user)=>{
  if (await User.findOne({ email: user.email })) {
    throw new Error("User already exist"); 
  }
  // create user without password only with google auth
  const newUser = await User.create(user);
  newUser.save().then((user)=>{
    return user;
  }).catch(err)
  {
      return err;
  }
}
const setUserRole = async (userId, data) => {
  const role = await User.updateOne(
    { _id: userId },
    { $set: { userType: data } },
    { new: true }
  );
  return role;
};

const verifyEmail = async (userId) =>
{
  const user = await User.findById(userId)
  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
}
const getUserInfo = (userId) => {
  const user = User.findById(userId).select("-password").populate("bookings");

  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};
const getAdminEvents = async (userId) => {
  try {
    const events = await Event.find({
      created_By: userId,
    })
      .populate("vendor")
      .exec();
    console.log(events);
    return events;
  } catch (err) {
    console.log(err);
  }
};
const getAllBookings = (userId) => {
  const bookings = Booking.find({ user: userId })
    .select("-user")
    .populate("event");
  return bookings;
};

module.exports = {
  CreateUser,
  setUserRole,
  getUserInfo,
  getAllBookings,
  getAdminEvents,
  verifyEmail,
  createGoogleUser
};
