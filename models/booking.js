const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true, // ensures unique booking IDs
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  dateOfJourney: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  isDriverAssigned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  driverDetails: {
    driverName: String,
    driverPhoneNumber: String,
    carNumber: String,
    remarks: String,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
