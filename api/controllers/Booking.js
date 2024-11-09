const Booking  = require('../models/Booking');
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


async function handleUserBookings(req, res) {
  try {
    const { token } = req.cookies;
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    // Decode the token to get user data
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      try {
        // Check if the place is already booked for the requested dates
        const existingBooking = await Booking.findOne({
          place,
          $or: [
            {
              checkIn: { $lte: checkOut, $gte: checkIn }, // Existing check-in is between requested dates
            },
            {
              checkOut: { $gte: checkIn, $lte: checkOut }, // Existing check-out is between requested dates
            },
          ],
        });

        if (existingBooking) {
          return res.status(400).json({ error: "The place is not available for the selected dates." });
        }

        // Proceed to create the new booking
        const doc = await Booking.create({
          place,
          checkIn,
          checkOut,
          numberOfGuests,
          name,
          phone,
          price,
          user: userData.id,
        });

        res.json(doc);

      } catch (createError) {
        console.error(createError);
        res.status(500).json({ error: "Failed to create booking." });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
}


async function handleGetUserBookings(req, res) {
  try {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if(err) throw err;
      const doc = await Booking.find({user: userData.id}).populate('place');
      res.json(doc);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleUserBookings,
  handleGetUserBookings
}