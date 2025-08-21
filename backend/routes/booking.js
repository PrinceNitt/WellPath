import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  checkAvailability,
  createNewBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get(
  "/getAvailableSlots/:centerId",
  authenticate,
  restrict(["patient"]),
  checkAvailability
);

router.post(
  "/book-appointment/:centerId",
  authenticate,
  restrict(["patient"]),
  createNewBooking
);

export default router;
