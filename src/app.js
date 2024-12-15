const envs =  require('./dotenv');
const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("../routes/bookingRoutes");
const contactRoutes = require("../routes/contactRoutes");
const enquiryRoutes = require("../routes/enquiryRoutes");
const adminRoutes = require("../routes/adminRoutes");


const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT 


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/admin", adminRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Zing Cab API!");
});


// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});


