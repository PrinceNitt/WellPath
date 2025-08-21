import Booking from "../models/BookingSchema.js";
import Center from "../models/CenterSchema.js";

//update

export const updateCenter = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCenter = await Center.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    if (!updatedCenter) {
      res.status(400).json({ success: false, msg: "Center not found" });
    }
    res.status(200).json({
      success: true,
      msg: "Successfully updated",
      data: updatedCenter,
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to update" });
  }
};

//delete

export const deleteCenter = async (req, res) => {
  const id = req.params.id;

  try {
    await Center.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Center Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "Failed to delete" });
  }
};

//get single Center

export const getSingleCenter = async (req, res) => {
  const id = req.params.id;

  try {
    const center = await Center.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({ success: true, msg: "Center found", data: center });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to find Center" });
  }
};

//get all Centers

export const getAllCenter = async (req, res) => {
  try {
    const { query } = req.query;
    let center = null;

    if (query) {
      center = await Center.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
          { address: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      center = await Center.find({}).select("-password");
    }

    res.status(200).json({ success: true, msg: "Centers found", data: center });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to find Centers" });
  }
};

//get profile

export const getCenterProfile = async (req, res) => {
  const centerId = req.userId;

  try {
    const center = await Center.findById(centerId).select("-password");

    if (!center) {
      res.status(400).json({ success: false, msg: "Center not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Profile info fetched",
      data: center,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, msg: "Failed to fecth profile info" });
  }
};

//get center appointments

export const getCenterAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ center: req.userId }).select(
      "user serviceType appointmentDate appointmentTime ticketPrice report"
    );

    res
      .status(200)
      .json({ success: true, msg: "Appointments fetched", data: bookings });
  } catch (error) {
    // console.log(error.message);

    res
      .status(400)
      .json({ success: false, msg: "Failed to fecth appointments" });
  }
};

//upload report
export const uploadReport = async (req, res) => {
  const bookingId = req.params.id;
  const reportUrl = req.body.report;
  try {
    const updatedDocument = await Booking.findByIdAndUpdate(
      bookingId, // ID of the document to update
      { $set: { report: reportUrl } }, // Data to update (e.g., { report: 'new-report-url' })
      { new: true, runValidators: true } // Options: new returns the updated document
    );

    res.status(200).json({ success: true, msg: "Report Uploaded" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to upload report" });
  }
};

//delete report
export const deleteReport = async (req, res) => {
  const bookingId = req.params.id;
  const reportUrl = "null";
  try {
    const updatedDocument = await Booking.findByIdAndUpdate(
      bookingId, // ID of the document to update
      { $set: { report: reportUrl } }, // Data to update (e.g., { report: 'new-report-url' })
      { new: true, runValidators: true } // Options: new returns the updated document
    );

    res.status(200).json({ success: true, msg: "Report Deleted" });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to delete report" });
  }
};
