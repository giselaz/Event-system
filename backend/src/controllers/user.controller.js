// const User = require("../model/user");
const UserService = require("../services/admin/user.service");
const ValidateUser = require("../validations/user.validation");
const transporter = require("../utils/transporter");
const jwt_decode = require("jwt-decode");

const addUserGoogle = async (req, res) => {
  const {
    email,
    given_name: name,
    family_name: surname,
    sub: googleId,
  } = jwt_decode(req.body.googleAccessToken);
  const role = req.params.userRole;
  const userData = { email, name, surname, googleId, role };
  try {
  } catch (err) {
    const dBuser = await UserService.createGoogleUser(userData);
    if (!dBuser._id) {
      res.status(400).json({ message: "User with this email already exists" });
    } else {
      res.json({
        message: "We just sent you an email with a link to verify your email.",
      });
    }
  }
};

const addUserSimple = async (req, res) => {
  const { value, error } = ValidateUser.validateRegister(req.body);
  try {
    const user = await UserService.CreateUser(value);
    if (user) {
      sendConfirmationEmail(user.email, user.name, user._id);
      res.status(200).json({
        message: "We just sent you an email with a link to verify your email.",
      });
    }
  } catch (err) {
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else if (err.message === "User already exist") {
      res.status(400).json({ message: "User with this email already exists" });
    } else res.status(500).json({ message: "internal server error" });
  }
};
const sendConfirmationEmail = (userEmail, name, userId) => {
  const emailBody = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      color: #4CAF50;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      text-align: center;
      margin-top: 20px;
    }
    .content p {
      font-size: 16px;
      color: #333333;
      line-height: 1.5;
    }
    .button-container {
      text-align: center;
      margin: 20px 0;
    }
    .button-container a {
      text-decoration: none;
      color: #ffffff;
      background-color: #4CAF50;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
    } 
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Email Confirmation</h1>
    </div>
    <div class="content">
      <p>Hi,${name}</p>
      <p>Please confirm your email address to complete your registration.</p>
    </div>
    <div class="button-container">
      <a href=" http://localhost:8080/users/verify-email/${userId}/ "
      )}" target="_blank">Confirm Email</a>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: "test199tests@gmail.com",
    to: userEmail,
    subject: "Please confirm email address",
    html: emailBody,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

const confirmEmail = async (req, res) => {
  const userId = req.params.userId;
  const user = await UserService.verifyEmail(userId);
  if (!user) {
    res
      .status(400)
      .json({ message: "The user with this email does not exist" });
  }
  res.json({ message: "User has been successfully verified" });
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
  addUserGoogle,
  setRole,
  getUserInfo,
  getAllBookings,
  addUserSimple,
  getAdminEvents,
  confirmEmail,
};
