import express from "express";
import {
  updateCenter,
  deleteCenter,
  getSingleCenter,
  getAllCenter,
  getCenterProfile,
  getCenterAppointments,
  uploadReport,
  deleteReport,
} from "../controllers/centerController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested routes
router.use("/:centerId/reviews", reviewRouter);

router.get("/:id", getSingleCenter);
router.get("/", getAllCenter);
router.put("/:id", authenticate, restrict(["center"]), updateCenter);
router.delete("/:id", authenticate, restrict(["center, admin"]), deleteCenter);

router.get(
  "/appointments/my-appointments",
  authenticate,
  getCenterAppointments
);
router.get("/profile/me", authenticate, restrict(["center"]), getCenterProfile);

router.put(
  "/appointments/upload-report/:id",
  authenticate,
  restrict(["center"]),
  uploadReport
);
router.put(
  "/appointments/delete-report/:id",
  authenticate,
  restrict(["center"]),
  deleteReport
);

export default router;
