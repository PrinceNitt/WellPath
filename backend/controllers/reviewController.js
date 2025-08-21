import Review from "../models/ReviewSchema.js";
import Center from "../models/CenterSchema.js";
import Bookings from "../models/BookingSchema.js";

//get all review

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({ success: true, msg: "Fetched", data: reviews });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Not found" });
  }
};

// check if a user availed service for any center
export const isServiceAvailed = async (req, res) => {
  const isBooked = Bookings.findOne({
    center: req.params.centerId,
    user: req.userId,
    report: { $ne: "null" },
  });

  if (!isBooked) {
    res
      .status(400)
      .json({ success: false, msg: "No bookings made for this center." });
  }

  res.status(200).json({ success: true, msg: "Booking made." });
};

// create review

export const createReview = async (req, res) => {
  if (!req.body.center) req.body.center = req.params.centerId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    await Center.findByIdAndUpdate(req.body.center, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      msg: "Review saved successfully",
      data: savedReview,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
