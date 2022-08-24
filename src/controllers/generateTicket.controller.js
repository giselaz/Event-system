const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

const generateTicket=(req,res)=>{
    const ticketFileName ='ticket'+eventId+'.pdf';
    const ticketPath = path.join('bileta',ticketFileName);
    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(ticketFileName));
    
    doc.fontSize(15).text('Ticket File')
    doc.end()
}