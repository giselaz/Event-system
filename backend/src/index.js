const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const job = require("./utils/cronjb");
dotenv.config();
const mongoose = require("mongoose");
const UserRoute = require("./routes/user.route");
const AuthRoute = require("./routes/auth.route");
const DepartmentRoute = require("./routes/departamenti.route");
const BookingRoute = require("./routes/booking.route");
const RoleRoute = require("./routes/role.route");
const Dbconnect = require("./utils/db");

const port = process.env.PORT;
const EventService = require("./services/admin/event.service");
const verifyToken = require("./middleware/auth.middleware");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/events',EventRoute)
app.use("/users", UserRoute);
app.use("/auth", AuthRoute);
app.use("/departament", DepartmentRoute);
app.use("/bookings", BookingRoute);
app.use("/roles", RoleRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/events/:id/images", async (req, res) => {
  await EventService.getEventImage(req.params.id).then((imagePath) => {
    res.sendFile(path.join(__dirname, "images", imagePath));
  });
});

job.start();
app.listen(4000 || port, () => {
  console.log(`Server Started at ${port}`);
});
