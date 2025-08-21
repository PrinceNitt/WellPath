import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import centerRoute from "./routes/center.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";

dotenv.config();
const port = process.env.PORT || 5001;
const app = express();

//db connection

mongoose.set("strictQuery", false);
const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB Connection failed ", error);
  }
};

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser);

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/center", centerRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

app.get("/", (req, res) => {
  res.status(200).json("welcome");
});

app.listen(port, () => {
  connectedDB();
  console.log("Server running at port " + port);
});
