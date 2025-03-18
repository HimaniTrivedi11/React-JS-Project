const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
// require("dotenv").config();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email, password: hashedPassword,
        });

        // save user
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: "1h" });

        res.status(201).json({ msg: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ msg: "Server Error.", error: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid email or password." });

        // generate JWT token
        const token = user.generateAuthToken();
        res.json({ token });
    } catch (err) {
        console.error('Login error:', error);
        res.status(500).json({ msg: "Server error." });
    }
});

// Logout user
router.post("/logout", async (req, res) => {
    res.json({ msg: "Logout successful." });
});

module.exports = router;