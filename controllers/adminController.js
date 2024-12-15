const Booking = require("../models/booking");
const Contact = require("../models/contact");
const Enquiry = require("../models/enquiry");

const assignDriver = async (req, res) => {
  try {
    const {
      bookingId,
      driverName,
      driverPhoneNumber,
      carNumber,
      remarks = "",
    } = req.body;

    // Find the booking by bookingId
    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    // Assign driver details
    booking.driverDetails = {
      driverName,
      driverPhoneNumber,
      carNumber,
      remarks,
    };
    booking.isDriverAssigned = true;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Driver assigned successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error assigning driver.",
    });
  }
};

const getContactDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const contacts = await Contact.find(query);

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching contact details.",
    });
  }
};

const getEnquiryDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const enquiries = await Enquiry.find(query);

    return res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching enquiry details.",
    });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.dateOfJourney = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const bookings = await Booking.find(query)
      .populate("userId", "phoneNumber")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBookings = await Booking.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        total: totalBookings,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalBookings / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching booking details.",
    });
  }
};

module.exports = {
  assignDriver,
  getContactDetails,
  getEnquiryDetails,
  getBookingDetails,
};
