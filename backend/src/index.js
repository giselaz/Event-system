const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
const job = require("./utils/cronjb");
dotenv.config();
const mongoose = require("mongoose");
const UserRoute = require("./routes/user.route");
const AuthRoute = require("./routes/auth.route");
const CategoryRoute = require("./routes/category.route");
const BookingRoute = require("./routes/booking.route");
const RoleRoute = require("./routes/role.route");
const EventRoute = require('./routes/event.routes');
const VendorRoute = require('./routes/vendor.route');
const Dbconnect = require("./utils/db");
const port = process.env.PORT;
// const EventService = require("./services/admin/event.service");
// const verifyToken = require("./middleware/auth.middleware");
app.use(express.json());
const allowedOrigins = [
  "http://localhost:8081", // if using CRA
   "http://localhost:8080", // if using CRA
  "https://your-frontend-domain.com" // production domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // <--- allow cookies
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// app.use('/events',EventRoute)
app.use("/users", UserRoute);
app.use("/vendors",VendorRoute);
app.use("/auth", AuthRoute);
app.use("/categories", CategoryRoute);
app.use("/events",EventRoute);
app.use("/bookings", BookingRoute);
app.use("/roles", RoleRoute);
app.use("/images", express.static(path.join(__dirname, "images")));




app.listen(4000 || port, () => {
  console.log(`Server Started at ${port}`);
});
