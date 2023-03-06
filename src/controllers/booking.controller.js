const BookingService = require("../services/booking.service");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const createBooking = async (req, res) => {
  const booking = await BookingService.bookLiveEvent(
    req.user,
    req.body.id,
    req.body.quantity,
    req.body.token
  ).then((booking) => {
    const ticketFileName = "ticket" + booking._id + ".pdf";
    const doc = new PDFDocument();
    const fileStream = fs.createWriteStream(ticketFileName);
    doc.pipe(fileStream);
    res.setHeader(
      "Content-disposition",
      `attachment; filename=${ticketFileName}`
    );
    const event_date = new Date(booking.event.start_date).toLocaleDateString(
      "sq-AL",
      { year: "numeric", month: "long", day: "numeric" }
    );
    doc.fontSize(20).text(`Booking Details for ${booking.event.name}`);
    doc.fontSize(16).text(`Event Date: ${event_date}`);
    doc.fontSize(16).text(`Quantity: ${booking.quantity}`);
    doc.fontSize(16).text(`Total Amount: ${booking.total_amount}`);

    doc.end();
    fileStream.on("finish", () => {
      console.log(`Saved booking details to ${ticketFileName}`);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "test199tests@gmail.com",
          pass: process.env.GOOGLE_PASSWORD,
        },
      });

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
      console.log(booking.user);
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
        subject: "Konfirmimi i Pjesemarrjes",

        text: `"Pershendetje ${req.user.name},`,
      };
      if (booking.event.event_type == "live") {
        mailOptions.html = "<p> Faleminderit per pjesemarrjen tuaj </p>";
      } else {
        mailOptions.html = `<p> Faleminderit per pjesemarrjen tuaj.</p> <br> <p>Here is the link to the event: <a href="${booking.event.event_link}">${booking.event.event_link}</a></p>`;
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
      res.status(400).json({ message: "Eventi ka mbaruar" });
    } else if (error.message === "Pjesemarrja juaj eshte konfirmuar tashme") {
      res
        .status(400)
        .json({ message: "Pjesemarrja juaj eshte konfirmuar tashme" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
module.exports = { createBooking, bookOnlineEvent };
