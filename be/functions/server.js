require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const router = express.Router();

app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profilepic : {type:String, default : ""},
    salutation: { type: String, default: "" },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, default: "" },

    home_address: { type: String, default: "" },
    country: { type: String, default: "" },
    postcode: { type: String, default: "" },

    dob: {
      type: Date,
      validate: {
        validator: function (value) {
          const ageDiffMs = Date.now() - new Date(value).getTime();
          const ageDate = new Date(ageDiffMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          return age >= 17;
        },
        message: "User must be at least 17 years old",
      },
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    marital_status: {
      type: String,
      enum: ["single", "married"],
      default: "single",
    },

    spouse_details: {
      salutation: { type: String, default: "" },
      firstname: { type: String, default: "" },
      lastname: { type: String, default: "" },
    },

    hobbies_and_interests: [{ type: String }],
    favourite_sports: [{ type: String }],
    preferred_music_genres: [{ type: String }],
    preferred_movies_tv_shows: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

router.get("/", (req, res) => {
  res.send("API is up");
});

router.post("/create", async (req, res) => {
  try {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
      return res.status(400).json({
        error: `All data is required`,
      });
    }

    const userExists = await User.findOne({ user_id });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user_id, password: hashedPassword });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id, user_id: savedUser.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res.status(201).json({
      message: "User created successfully!",
      token: `Bearer ${token}`,
    });

    res.status(201).json({ message: `Data saved successfully!` });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({
      error: `An error occurred while saving the data. , ${error.message}`,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(401).json({ message: "Invalid user ID or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid user ID or password" });
    }

    const token = jwt.sign(
      { id: user._id, user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Now available in the route
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

router.post("/basic_details", authenticate, async (req, res) => {
  const { profilepic, salutation, firstname, lastname, email } = req.body;

  if (!salutation || !firstname || !lastname || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilepic, salutation, firstname, lastname, email },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

router.post("/additional_details", authenticate, async (req, res) => {
  const { home_address, country, postcode, dob, gender, marital_status } =
    req.body;

  if (!home_address || !country || !postcode) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userAge = new Date().getFullYear() - new Date(dob).getFullYear();
  if (userAge < 17) {
    return res
      .status(400)
      .json({ message: "User must be at least 17 years old" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { home_address, country, postcode, dob, gender, marital_status },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

router.post("/spouse_details", authenticate, async (req, res) => {
  const { salutation, firstname, lastname } = req.body;

  if (!salutation || !firstname || !lastname) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        spouse_details: {
          salutation,
          firstname,
          lastname,
        },
      },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "Spouse details updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

router.post("/preferences", authenticate, async (req, res) => {
  const {
    hobbies_and_interests,
    favourite_sports,
    preferred_music_genres,
    preferred_movies_tv_shows,
  } = req.body;

  if (
    !Array.isArray(hobbies_and_interests) ||
    !Array.isArray(favourite_sports) ||
    !Array.isArray(preferred_music_genres) ||
    !Array.isArray(preferred_movies_tv_shows)
  ) {
    return res.status(400).json({ message: "All preferences must be arrays" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        hobbies_and_interests,
        favourite_sports,
        preferred_music_genres,
        preferred_movies_tv_shows,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Preferences updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating preferences:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ user_id: decoded.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("files"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { subdir } = req.query;
    if (!subdir) {
      return res.status(400).json({ message: "Subdirectory is required" });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const uploadUrl = `https://sandbox.87.agency/activation-images/imageupload.php?subdir=${subdir}`;

    const response = await axios.post(uploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    res.json({ filePath: response.data.file });
  } catch (error) {
    console.error("File upload error:", error.message);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
});

app.use("/.netlify/functions/server", router);

connectToMongoDB().catch(console.error);

module.exports.handler = serverless(app);
