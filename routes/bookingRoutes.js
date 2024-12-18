const express = require("express");
const router = express.Router();
const { bookingController } = require("../controllers/bookingController");

router.post("/book", bookingController.createBooking);
router.post("/update-booking-status", bookingController.updateBookingStatus);

module.exports = router;
