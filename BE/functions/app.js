const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGINS?.split(',') : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// MongoDB Connection
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Successfully connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
}

// User Schema
const UserSchema = new mongoose.Schema({
  user_id: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Helper function to validate input
function validateUserInput(user_id, password) {
  const errors = [];
  
  if (!user_id || typeof user_id !== 'string' || user_id.trim().length < 3) {
    errors.push("User ID must be at least 3 characters long");
  }
  
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }
  
  return errors;
}

// Routes
app.post("/.netlify/functions/app/register", async (req, res) => {
  try {
    await connectToMongoDB();

   
    
    const { user_id, password, apple } = req.body;

    
    // Validate input
    const validationErrors = validateUserInput(user_id, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationErrors 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ user_id: user_id.trim() });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      user_id: user_id.trim(), 
      password: hashedPassword 
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        user_id: newUser.user_id,
        _id: newUser._id
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    
    if (err.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

app.post("/.netlify/functions/app/login", async (req, res) => {
  try {
    await connectToMongoDB();
    
    const { user_id, password } = req.body;

    // Validate input
    if (!user_id || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await User.findOne({ user_id: user_id.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return success response
    res.json({ 
      message: "Login successful", 
      user: {
        user_id: user.user_id,
        _id: user._id
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

app.get("/.netlify/functions/app/health", (req, res) => {
  res.json({ 
    message: "App is running", 
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

app.get("/.netlify/functions/app/", (req, res) => {
  res.json({ 
    message: "Welcome to the API", 
    endpoints: [
      "POST /.netlify/functions/app/register",
      "POST /.netlify/functions/app/login", 
      "GET /.netlify/functions/app/health"
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Export the serverless handler
module.exports.handler = serverless(app);