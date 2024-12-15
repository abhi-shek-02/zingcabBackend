const express = require("express");
const router = express.Router();
const {
  assignDriver,
  getContactDetails,
  getBookingDetails,
  getEnquiryDetails,
} = require("../controllers/adminController");

router.post("/assign-driver", assignDriver);
router.get("/get-contact-details", getContactDetails);
router.get("/get-booking-details", getBookingDetails);
router.get("/get-enquiry-details", getEnquiryDetails);

module.exports = router;
