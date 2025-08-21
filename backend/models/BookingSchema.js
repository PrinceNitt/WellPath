import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    center: {
      type: mongoose.Types.ObjectId,
      ref: "Center",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    centerName: { type: String },
    userName: { type: String },
    serviceType: { type: String },
    ticketPrice: { type: String, required: true },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled", "completed", "creatingReport"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    report: {
      type: String,
      default: "null",
    },
  },
  { timestamps: true }
);

// Middleware to automatically populate center and user details
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "center",
    select: "name photo", // Assuming the 'Center' model has a 'centerName' field
  }).populate({
    path: "user",
    select: "name photo", // Assuming the 'User' model has a 'userName' field
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
