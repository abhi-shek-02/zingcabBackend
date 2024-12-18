const { v4: uuidv4 } = require("uuid");

const generateBookingId = () => {
  // Generate a UUID and simplify it for a more user-friendly booking ID
  return `ZC${uuidv4().split("-")[0].toUpperCase()}`;  
};

module.exports = generateBookingId;
