const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB connected")).catch((err)=>console.error("MongoDb error : ", err));

app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ user_id });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user_id, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


app.post("/login", async (req, res) => {
    const { user_id, password } = req.body;
    const user = await User.findOne({ user_id, password });
  
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    res.json({ message: "Login successful", user });
  });
  

dotenv.config();
connectDB();



app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
