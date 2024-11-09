const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  photos: [String],
  description: {
    type: String,
  },
  perks: [String],
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
