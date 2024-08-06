const express = require("express");
const multer = require('multer');

const photosMiddleware = multer({dest: 'uploads'});

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

const { handleUploadLocalFile, handleUploadByLink } = require("../controllers/PhotoUploader");


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

router.post("/upload-by-link", handleUploadByLink);
router.post("/upload" , photosMiddleware.array('photos',100), handleUploadLocalFile);

module.exports = router;
