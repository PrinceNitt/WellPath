import User from "../models/UserSchema.js ";
import Booking from "../models/BookingSchema.js";
import Center from "../models/CenterSchema.js";

//update

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      res.status(400).json({ success: false, msg: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, msg: "Successfully updated", data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to update" });
  }
};

//delete

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "Failed to delete" });
  }
};

//get single user

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({ success: true, msg: "User found", data: user });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to find user" });
  }
};

//get all users

export const getAllUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.find({}).select("-password");

    res.status(200).json({ success: true, msg: "Users found", data: user });
  } catch (error) {
    res.status(400).json({ success: false, msg: "Failed to find users" });
  }
};

//get profile

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ success: false, msg: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({ success: true, msg: "Profile info fetched", data: { ...rest } });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, msg: "Failed to fecth profile info" });
  }
};

//get user appointments

export const getMyAppointments = async (req, res) => {
  try {
    //step 1 - retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.userId }).select(
      "center user serviceType appointmentDate appointmentTime ticketPrice report"
    );

    res
      .status(200)
      .json({ success: true, msg: "Appointments fetched", data: bookings });
  } catch (error) {
    console.log(error.message);

    res
      .status(400)
      .json({ success: false, msg: "Failed to fecth appointments" });
  }
};
