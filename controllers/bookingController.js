const generateBookingId = require("../utils/generateBookingId");
const Booking = require("../models/booking");
const User = require("../models/user");


const bookingController   = {

  createBooking :  async (req, res) => {
    try {
      const {
        pickupLocation,
        dropLocation,
        dateOfJourney,
        phoneNumber,
        carType,
        amount,
        message = "",
      } = req.body;
  
      // Check if the user already exists or create a new user
      let user = await User.findOne({ phoneNumber });
      if (!user) {
        user = await User.create({ phoneNumber  });
      }
  
      // Generate unique booking ID using utility
      const bookingId = generateBookingId();
  
      // Create new booking
      const newBooking = new Booking({
        bookingId,
        pickupLocation,
        dropLocation,
        dateOfJourney,
        phoneNumber,
        carType,
        amount,
        message,
        userId: user._id,
      });
  
      await newBooking.save();
  
      return res.status(200).json({
        success: true,
        message: "Booking created successfully.",
        bookingId: newBooking.bookingId,
      });
    } catch (err) {
  
      return res.status(500).json({
        success: false,
        message: "Error creating booking.",
        err: err.message
      });
    }
  } ,


  updateBookingStatus :  async function name(req , res ) {
      try {
         
        const {  bookingId , status }  = req.body
      
      let updated  = await Booking.updateOne({bookingId} , {
        $set:{
          bookingStatus :status 
        }
      })
      
    return res.status(200).json({
      success: true,
      message: "updated.",
      bookingId: updated,
    });

      }catch(err) {
       
        return res.status(500).json({
          success: false,
          message: "Error updating booking.",
          err: err.message
        });

      }
    
    
  }

}



module.exports = { bookingController };
