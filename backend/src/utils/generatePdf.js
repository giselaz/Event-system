const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateTicket = (booking, res) => {
  const ticketFileName = "ticket" + eventId + ".pdf";
  const ticketPath = path.join("../bileta", ticketFileName);
  const doc = new PDFDocument();
  doc.pipe(res);
  res.setHeader(
    "Content-disposition",
    `attachment; filename=${ticketFileName}`
  );

  doc.fontSize(20).text(`Booking Details for ${booking.event.name}`);
  doc.image(booking.event.image, { fit: [250, 250], align: "center" });
  doc.fontSize(16).text(`Event Date: ${booking.event.start_date}`);
  doc.fontSize(16).text(`Quantity: ${booking.quantity}`);
  doc.fontSize(16).text(`Total Amount: ${booking.total_amount}`);

  doc.end();
  doc.on("end", () => {
    // save the PDF file to disk
    fs.writeFile(fileName, doc, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Saved booking details to ${fileName}`);
      }
    });
  });
};

module.exports = generateTicket;
