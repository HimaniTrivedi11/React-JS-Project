const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Clock-in 
router.post('/clock-in', attendanceController.clockIn);

// Clock-out
router.post('/clock-out/:id', attendanceController.clockOut);

// Get all attendance records (optional)
router.get('/', attendanceController.getAllAttendances);

//Get a single attendance record by ID (optional)
router.get("/:id", attendanceController.getAttendanceById);

module.exports = router;