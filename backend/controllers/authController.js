import User from "../models/UserSchema.js";
import Center from "../models/CenterSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateJWT = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
    // {
    //     expiresIn:'1d',
    // }
  );
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "center") {
      user = await Center.findOne({ email });
    }

    // check if user exists
    if (user) {
      // console.log(user);
      return res.status(400).json({ msg: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    if (role === "center") {
      user = new Center({
        name,
        email,
        password: hashedPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, msg: "User successfully registered" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const center = await Center.findOne({ email });

    if (patient) user = patient;
    if (center) user = center;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User does not exists" });
    }

    //check if user exists or not
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Incorrect Password" });
    }

    //get token
    const token = generateJWT(user);
    // console.log(user);
    const { password, role, appointments, ...rest } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        msg: "Sucessfully Logged in",
        token,
        role,
        data: { ...rest },
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, msg: "Failed to login" });
  }
};
