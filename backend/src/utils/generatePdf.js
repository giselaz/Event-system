const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateTicket =  (booking, res) => {
  const ticketFileName = "ticket" + booking._id + ".pdf";
  const doc = new PDFDocument();
  const fileStream = fs.createWriteStream(ticketFileName)
  doc.pipe(fileStream);
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
  // doc.on("end", () => {
    
  // });
  return fileStream;
};

module.exports = generateTicket;
