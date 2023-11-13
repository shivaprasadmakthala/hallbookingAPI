const express = require("express");
const router = express.Router();
const bookingModules = require("../modules/booking")

router.get("/room", bookingModules.availableRoom);
router.post("/room", bookingModules.createRoom);
router.get("/bookRoom", bookingModules.bookedRoom);
router.post("/bookRoom", bookingModules.startBooking);
router.get("/customers", bookingModules.bookedCustomer);

module.exports = router;