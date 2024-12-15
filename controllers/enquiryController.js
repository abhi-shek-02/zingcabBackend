const Enquiry = require("../models/enquiry");

const createEnquiry = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      dateOfJourney,
      phoneNumber,
      message = "",
    } = req.body;

    // Validate required fields
    if (!pickupLocation || !dropLocation || !dateOfJourney || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required except message.",
      });
    }

    // Save enquiry details in the database
    const newEnquiry = await Enquiry.create({
      pickupLocation,
      dropLocation,
      dateOfJourney,
      phoneNumber,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error submitting enquiry.",
    });
  }
};

module.exports = { createEnquiry };
