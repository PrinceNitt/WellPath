import express from "express";
import {
  getAllReviews,
  createReview,
  isServiceAvailed,
} from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(authenticate, restrict(["patient"]), createReview);

router
  .route("/isServiceAvailed")
  .get(authenticate, restrict(["patient"]), isServiceAvailed);

export default router;
