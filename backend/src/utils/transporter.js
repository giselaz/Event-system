const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test199tests@gmail.com",
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

module.exports= transporter;