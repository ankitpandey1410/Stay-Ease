const Place = require('../models/Place');
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

async function handleGetPlaces(req, res) {
  try {
    res.json(await Place.find());
  } catch (error) {
    console.log(error);
  }
}

async function handlePlaceRegister(req, res) {
  try {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description,
       perks, extraInfo, checkIn , checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if(err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos:addedPhotos, description,
       perks, extraInfo, checkIn , checkOut, maxGuests, price
      })
      res.json(placeDoc);
    })
  } catch (error) {
    console.log(error);
  }
}

async function handleGetUserPlaces(req, res) {
  try {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      const {id} = userData;
      res.json(await Place.find({owner:id}))
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleGetPlaceById(req, res) {
  try {
    const {id} = req.params;
    res.json(await Place.findById(id));
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdatePlace(req, res) {
  try {
    const {token} = req.cookies;
    const {
      id , title, address, addedPhotos, description,
      perks, extraInfo, checkIn , checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if(userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title, address, photos:addedPhotos, description,
          perks, extraInfo, checkIn , checkOut, maxGuests, price
        });
        await placeDoc.save();
        res.json('ok');
      }
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleGetPlaces,
  handlePlaceRegister,
  handleGetUserPlaces,
  handleGetPlaceById,
  handleUpdatePlace
}




