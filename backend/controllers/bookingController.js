import User from "../models/UserSchema.js ";
import Booking from "../models/BookingSchema.js";
import Center from "../models/CenterSchema.js";
import mongoose from "mongoose";

//check availability
export const checkAvailability = async (req, res) => {
  try {
    const { serviceType, appointmentDate } = req.query;
    const centerId = req.params.centerId;

    // Convert the date to a weekday string
    const weekDay = new Date(appointmentDate).toLocaleString("en-us", {
      weekday: "long",
    });

    const day = weekDay.toLowerCase();

    // Retrieve the center with its relevant timeSlots
    const center = await Center.findOne({
      _id: centerId,
    });

    if (!center) throw new Error("Center not found");

    // Filter the slots by service type and day
    const slots = center.timeSlots.filter(
      (slot) => slot.serviceType === serviceType && slot.day === day
    );

    // Get existing bookings for the date, service type, and startTime
    const bookedSlots = await Booking.aggregate([
      {
        $match: {
          centerId: new mongoose.Types.ObjectId(centerId),
          serviceType: serviceType,
          date: new Date(appointmentDate),
        },
      },
      {
        $group: {
          _id: { appointmentTime: "$appointmentTime" }, // Group by startTime only
          count: { $sum: 1 },
        },
      },
    ]);

    // Map booked slots to a dictionary for easier lookup
    const bookedSlotCount = {};
    bookedSlots.forEach((slot) => {
      const key = `${slot._id.appointmentTime}`;
      bookedSlotCount[key] = slot.count;
    });
    // console.log(bookedSlots);

    // Filter available slots based on maxPatientCount and startTime
    const availableSlots = slots.filter((slot) => {
      const key = `${slot.appointmentTime}`;
      return (bookedSlotCount[key] || 0) < slot.maxPatientsCount;
    });

    // console.log(availableSlots);

    res.status(200).json({
      success: true,
      msg: "Fetched available slots",
      slots: availableSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

//make a new booking

export const createNewBooking = async (req, res) => {
  //get the currently being booked center
  const center = await Center.findById(req.params.centerId);
  const user = await User.findById(req.userId);
  try {
    const booking = new Booking({
      center: center._id,
      user: user._id,
      serviceType: req.body.serviceType,
      ticketPrice: req.body.ticketPrice,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
    });

    await booking.save();

    res
      .status(200)
      .json({ success: true, msg: "Appointment Booked Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: error.message });
  }
};
