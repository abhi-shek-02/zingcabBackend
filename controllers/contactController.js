const Contact = require("../models/contact");

const createContact = async (req, res) => {
  try {
    const { name, phoneNumber, email = "", subject, message } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required except email.",
      });
    }

    // Save contact details in the database
    const newContact = await Contact.create({
      name,
      phoneNumber,
      email,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Contact details submitted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error submitting contact details.",
    });
  }
};

module.exports = { createContact };
