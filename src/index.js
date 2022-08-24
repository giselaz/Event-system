const express = require('express');
const dotenv = require('dotenv');
 const path= require('path');
 const generateTicket =require('./utils/generatePdf')
dotenv.config();
const mongoose = require('mongoose');
const EventRoute =require('./routes/event.routes');
const UserRoute = require('./routes/user.route')
const AuthRoute = require('./routes/auth.route')
const FakultetRoute=require('./routes/fakulteti.route')
const Dbconnect =require('./utils/db')
const app = express();



app.use(express.json());


app.use('/events',EventRoute)
app.use('/users',UserRoute)
app.use('/auth',AuthRoute)
app.use('/fakultet',FakultetRoute)
app.use('/images',express.static(path.join(__dirname,'images')))

app.get('/file/:eventId',async(req,res)=>{
    const ticketFilename= 'ticket'+req.params.eventId+'.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
     'Content-Disposition',
     'inline; filename="' + ticketFilename + '"'
   );
   const doc= await generateTicket(req.params.eventId);
  
})
app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})