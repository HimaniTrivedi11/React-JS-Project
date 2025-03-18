// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Form } from "react-bootstrap";

// const AttendanceSheet = () => {
//     const [attendanceData, setAttendanceData] = useState([]);
//     const [filterDate, setFilterDate] = useState("");

//     useEffect(() => {
//         fetchAttendance();
//     }, []);

//     const fetchAttendance = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/attendance/records");
//             setAttendanceData(response.data);
//         } catch (error) {
//             console.error("Error fetching attendance records", error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="text-center">Attendance Management Sheet</h3>

//             {/* Filter by Date */}
//             <Form.Group className="mb-3">
//                 <Form.Label>Filter by Date</Form.Label>
//                 <Form.Control type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
//             </Form.Group>

//             {/* Attendance Table */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>User</th>
//                         <th>Clock In</th>
//                         <th>Clock Out</th>
//                         <th>Total Hours</th>
//                         <th>Break Time (min)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {attendanceData
//                         .filter((record) => !filterDate || record.date === filterDate)
//                         .map((record) => (
//                             <tr key={record._id}>
//                                 <td>{record.date}</td>
//                                 <td>{record.userId.name}</td>
//                                 <td>{record.clockInTime}</td>
//                                 <td>{record.clockOutTime || "N/A"}</td>
//                                 <td>{record.totalHours || "N/A"}</td>
//                                 <td>{record.breakTime}</td>
//                             </tr>
//                         ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// export default AttendanceSheet;

import {useState} from 'react';
import axios from 'axios';

const AttendanceSheet = () => {
    const [userId, setUserId] = useState("");
    const [clockInTime, setClockInTime] = useState("");
    const [clockOutTime, setClockOutTime] = useState("");
    const [breakTime, setBreakTime] = useState("");
    const [message, setMessage] = useState("");

    // CLock in function
    const handleClockIn = async ()  => {
        try{
            const response = await axios.post("http://localhost:5000/api/attendance/clock-in", {
                userId,
                clockInTime
            });
            setMessage(response.data.message);
        } catch(error){
            setMessage("Error: "+ error.response?.data?.error || error.message);
        }
    };

    // Clock out function
    const handleClockOut = async ()  => {
        try{
            const response = await axios.put(`http://localhost:5000/api/attendance/clock-out/${userId}`, {
                clockOutTime,
                breakTime
            });
            setMessage(response.data.message);
        } catch (error){
            setMessage("Error: "+ error.response?.data?.error || error.message);
        }
    };

    return(
        <div className="container mt-4">
        <h3>Attendance Management</h3>

        {/* User ID Input */}
        <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-control mb-3"
        />

        {/* Clock In Input */}
        <input
            type="time"
            value={clockInTime}
            onChange={(e) => setClockInTime(e.target.value)}
            className="form-control mb-3"
        />
        <button className="btn btn-success" onClick={handleClockIn}>
            Clock In
        </button>

        {/* Clock Out Input */}
        <input
            type="time"
            value={clockOutTime}
            onChange={(e) => setClockOutTime(e.target.value)}
            className="form-control mt-3"
        />
        <input
            type="number"
            placeholder="Break Time (minutes)"
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
            className="form-control mt-3"
        />
        <button className="btn btn-danger mt-2" onClick={handleClockOut}>
            Clock Out
        </button>

        {/* Display Message */}
        {message && <p className="mt-3 text-info">{message}</p>}
    </div>
    )
};

export default AttendanceSheet;
