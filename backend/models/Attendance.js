const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: Date,
    clockInTime: String,
    clockOutTime: String,
    totalHours: String,
    breakTime: String,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;