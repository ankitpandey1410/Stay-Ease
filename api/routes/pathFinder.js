const express = require("express");

const {
  handleUserRegister,
  handleUserLogIn,
  handleUserLogOut,
  handleUserProfile,
} = require("../controllers/User");

const {
  handleGetPlaces,
  handlePlaceRegister,
  handleGetUserPlaces,
  handleGetPlaceById,
  handleUpdatePlace,
} = require("../controllers/Place");

const {
  handleUserBookings,
  handleGetUserBookings,
} = require("../controllers/Booking");

const router = express.Router();

router.post("/user/register", handleUserRegister);//done
router.post("/user/login", handleUserLogIn); // done
router.post("/user/logout", handleUserLogOut); // done
router.get("/user/profile", handleUserProfile); //done

router.get("/places", handleGetPlaces); // done
router.post("/user/places", handlePlaceRegister); // done
router.get("/user/places", handleGetUserPlaces); // done
router.get("/user/places/:id", handleGetPlaceById); // done
router.put("/user/places", handleUpdatePlace); // done

router.post("/user/bookings", handleUserBookings); // done
router.get("/user/bookings", handleGetUserBookings); // done

module.exports = router;
