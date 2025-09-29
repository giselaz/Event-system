const BookingService = require("../services/booking.service");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const transporter = require("../utils/transporter");
const generateTicket = require("../utils/generatePdf");

const createBooking = async (req, res) => {
  await BookingService.bookLiveEvent(
    req.user._id,
    req.body.id,
    req.body.quantity,
    req.body.token
  ).then((booking) => {
    const fileStream = generateTicket(booking, res);
    fileStream.on("finish", () => {
      console.log(`Saved booking details to ${ticketFileName}`);
      const mailOptions = {
        from: "test199tests@gmail.com",
        to: `${req.body.token.email}`,
        subject: "Booking Details",

        text: "Please find your booking details attached.",
        attachments: [
          {
            filename: ticketFileName,
            path: `./${ticketFileName}`,
            contentType: "application/pdf",
          },
        ],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
    });
    res.status(200).json(booking);
  });
};

const bookOnlineEvent = async (req, res) => {
  try {
    const booking = await BookingService.bookOnlineEvent(
      req.user._id,
      req.body.id
    ).then((booking) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "test199tests@gmail.com",
          pass: process.env.GOOGLE_PASSWORD,
        },
      });
      const mailOptions = {
        from: "test199tests@gmail.com",
        to: `${req.user.email}`,
        subject: "Confirmation of your booking",

        text: `"Hello ${req.user.name},`,
      };
      if (booking.event.event_type == "live") {
        mailOptions.html = "<p> Thank you for your participation </p>";
      } else {
        mailOptions.html = `<p> Thank you for your participation.</p> <br> <p>Here is the link to the event: 
        <a href="${booking.event.event_link}">${booking.event.event_link}</a></p>`;
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
      res.status(200).json(booking);
    });
  } catch (error) {
    if (error.message === "event has ended") {
      res.status(400).json({ message: "Event has ended" });
    } else if (
      error.message === "Your participation has already been confirmed"
    ) {
      res
        .status(400)
        .json({ message: "Your participation has already been confirmed" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const removeBooking = async (req, res) => {
  try {
    await BookingService.removeBooking(req.body.userId, req.params.eventId);
    res.status(200).json({ message: "Booking has been removed successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { createBooking, bookOnlineEvent, removeBooking };
