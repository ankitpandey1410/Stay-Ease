const Booking  = require('../models/Booking');
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async(err, userData) => {
      if(err) throw err;
      resolve(userData);
    });
  });
}

async function handleUserBookings(req, res) {
  try {
    const userData = await getUserDataFromReq(req)
    const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = req.body;
    Booking.create({
      place,checkIn,checkOut,numberOfGuests,name,phone,price,user:userData.id
    }).then((doc) => {
      res.json(doc);
    }).catch((err) => {
      throw err;
    })
  } catch (error) {
    console.log(error);
  }
}

async function handleGetUserBookings(req, res) {
  try {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleUserBookings,
  handleGetUserBookings
}