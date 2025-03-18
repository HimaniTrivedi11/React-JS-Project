const Attendance = require('../models/Attendance');

// Clock-in function
exports.clockIn = async (req, res) => {
    try {
        const { date, clockInTime } = req.body;
        const attendance = new Attendance({
            date: date,
            clockInTime: clockInTime,
            clockOutTime: null,
            totalHours: "N/A",
            breakTime: "N/A",
        });

        const savedAttendance = await attendance.save();
        res.status(201).json({
            message: "Clock-in saved successfully",
            attendanceId: savedAttendance._id,
        });
    } catch (error) {
        console.error("Error saving clock-in:", error);
        res.status(500).json({ error: "Server Error" })
    }
};

// Clock-out function
exports.clockOut = async (req, res) => {
    try {
        const { clockOutTime, totalHours, breakTime } = req.body;
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({ error: "Attendance Record Not found" });
        }

        attendance.clockOutTime = clockOutTime;
        attendance.totalHours = totalHours;
        attendance.breakTime = breakTime;

        await attendance.save();
        res.status(200).json({ message: "Clock-out updated successfully" });
    } catch (error) {
        console.error("Error updating clock-out:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all attendance records (optional)
exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.status(200).json(attendances);
    } catch (error) {
        console.error("Error fetching attendances:", error);
        res.status(500).json({ error: "Server error" });
    }
};

//Get a single attendance record by ID (optional)
exports.getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ error: "Attendance Record Not found" })
        }
        res.status(200).json(attendance)
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ error: "Server error" })
    }
}