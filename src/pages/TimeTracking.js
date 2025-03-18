import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Card, Button } from "react-bootstrap";
import { FaClock, FaCalendarAlt, FaTasks, FaSearch } from "react-icons/fa";
import Sidebar from './Sidebar';
import '../pages/TimeTracking.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TimeTracking = () => {

    // Toggle Sidebar function
    const [open, setOpen] = useState(true);
    const toggleSidebar = () => {
        setOpen(!open);
    };

    // Current Time and Date function
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date(), 1000));
        return () => clearInterval(timer);
    }, []);

    // Clock In/Out handle function
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState(null);
    const [clockOutTime, setClockOutTime] = useState(null);
    const [records, setRecords] = useState([]); // To store attendance records
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [breakTime, setBreakTime] = useState(null);
    const [attendanceId, setAttendanceId] = useState(null);

    // Function to get current time
    const getCurrentTime = () => new Date();

    // Retrieve stored times from localStorage on component mount
    // useEffect(() => {
    //     const storedClockIn = localStorage.getItem("clockInTime");
    //     const storedClockOut = localStorage.getItem("clockOutTime");
    //     const storedIsClockIn = localStorage.getItem("isClockIn");
    //     const storedStartBreak = localStorage.getItem("startBreakTime");

    //     if (storedClockIn) setClockInTime(storedClockIn);
    //     if (storedClockOut) setClockOutTime(storedClockOut);
    //     if (storedStartBreak) setStartBreakTime(new Date(storedStartBreak));

    //     setIsClockedIn(storedIsClockIn === "true");
    // }, []);

    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/attendances")
    //         .then(response => {
    //             setAttendanceRecords(response.data);
    //         })
    //         .catch(error => console.error("Error fetching records:", error));
    // }, []);

    // function for clocking in
    const handleClockIn = async () => {
        const now = new Date();
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const currentTime = now.toLocaleTimeString(undefined, options);

        setClockInTime(currentTime);
        setClockOutTime(null);
        setIsClockedIn(true);

        // Add record to the records array
        const newRecord = {
            date: now.toISOString(),
            clockInTime: currentTime,
            clockOutTime: null,
            totalHours: 'N/A',
            breakTime: 'N/A'
        };
        setRecords([...records, newRecord]);

        try {
            const response = await axios.post("http://localhost:5000/api/attendances/clock-in", {
                date: now.toISOString(),
                clockInTime: currentTime,
            });
            console.log("Clock-in response:", response.data);
            setAttendanceId(response.data.attendanceId); // Store the ID
        } catch (error) {
            console.error("Error saving clock-in:", error);
        }
    };

    // clockOut function
    const handleClockOut = async () => {
        if (!isClockedIn) {
            console.error("Error: is undefined");
            return;
        }

        const now = new Date();
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const currentTime = now.toLocaleTimeString(undefined, options);

        const confirmReset = window.confirm("Are you sure you want to clock out?");
        if (confirmReset) {
            setClockOutTime(currentTime);
            setIsClockedIn(false);

            // Find the record to update the clock-out time and total hours
            let updatedRecords = records.map((record) => {
                if (record.clockOutTime === null) {
                    const workedHours = calculateTotalHours(record.clockInTime, currentTime, breakTime);
                    return {
                        ...record,
                        clockOutTime: currentTime,
                        totalHours: workedHours,
                        breakTime: breakTime
                    };
                }
                return record;
            });

            setRecords(updatedRecords);


            if (!attendanceId) {
                console.error("Error: attendanceId is undefined");
                return;
            }

            if (typeof breakTime !== 'number') {
                console.error("Error: breakTime is not a number");
                return;
            }

            const workedHours = calculateTotalHours(clockInTime, currentTime, breakTime);

            try {
                await axios.put(`http://localhost:5000/api/attendances/clock-out/${attendanceId}`, {
                    clockOutTime: currentTime,
                    totalHours: calculateTotalHours(clockInTime, currentTime, breakTime),
                    breakTime: breakTime,
                });
                console.log("Clock-out success");
            } catch (error) {
                console.error("Error updating clock-out:", error);
            }
        }
    };

    const calculateTotalHours = (clockIn, clockOut, breakTime) => {
        //parse time strings, and combine with todays date.
        const today = new Date();
        const parseTimeString = (timeString) => {
            const [hours, minutes, seconds] = timeString.split(':').map((val) => parseInt(val));
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
        }

        const clockInDate = parseTimeString(clockIn);
        const clockOutDate = parseTimeString(clockOut);

        let diff = (clockOutDate - clockInDate) / (1000 * 60 * 60); // Time difference in hours

        // Subtract break time (convert break time from minutes to hours)
        diff -= breakTime / 60;

        return diff.toFixed(2); // Rounded to two decimal places
    };

    // Start Break handle function
    const [startBreakTime, setStartBreakTime] = useState(null);
    const fixedEndBreakTime = "2:00 PM";
    const endBreakHour = 14;

    const getBreakCurrentTime = () => new Date();

    const handleBreakTime = () => {
        const currentTime = getBreakCurrentTime();
        const currentHours = currentTime.getHours();

        // Check if the current time is past 2 PM
        if (currentHours >= endBreakHour) {
            alert("Break cannot be started after 2 PM.");
            return;
        }

        setStartBreakTime(currentTime);
        localStorage.setItem("startBreakTime", currentTime.toISOString());

        // set timeout to end the break at 2 PM
        const endBreakTime = new Date();
        endBreakTime.setHours(endBreakHour, 0, 0, 0);

        const timeUntilEnd = endBreakTime - currentTime;
        if (timeUntilEnd > 0) {
            setTimeout(() => {
                alert("Break time has ended as it is now past 2 PM.");
                handleBreakEndTime();
            }, timeUntilEnd);
        }
    };

    const handleBreakEndTime = () => {
        setStartBreakTime(null);
        localStorage.removeItem("startBreakTime");
    };

    // Displaying start break time
    const displayStartBreakTime = startBreakTime ? new Date(startBreakTime).toLocaleTimeString() : "No break started.";

    // Date picker function
    const [isOpen, setIsOpen] = useState(false);

    // Tasks function
    const [task, setTask] = useState("");
    const [taskTime, setTaskTime] = useState("");
    const [tasks, setTasks] = useState([]);

    //function to handle new tasks
    const addTasks = () => {
        if (task.trim() && taskTime) {
            const newTasks = {
                id: tasks.length + 1,
                task,
                time: taskTime,
                date: selectedDate.toDateString(),
            };
            setTasks([...tasks, newTasks]);
            setTask("");
            setTaskTime("");
        }
    };

    // Attendance function
    // const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalHours, setTotalHours] = useState(0);
    const [filteredRecords, setFilteredRecords] = useState(attendanceRecords);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });

    useEffect(() => {
        // fetch or initialize attendance records
        const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
        setAttendanceRecords(records);
        setFilteredRecords(records);
    }, []);

    const handleFilter = () => {
        const filtered = attendanceRecords.filter(record => {
            const recordDate = new Date(record.date);
            return (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));
        });
        setFilteredRecords(filtered);
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key, direction });

        const sortedRecords = [...records].sort((a, b) => {
            if (key === 'date') {
                return direction === 'ascending'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            return direction === 'ascending'
                ? a[key].localeCompare(b[key])
                : b[key].localeCompare(a[key]);
        });

        setRecords(sortedRecords);
    };




    return (
        <Container fluid className="mt-3">
            {/* Sidebar */}
            <Col md={2} className='p-0'>
                <Sidebar open={open} toggleSidebar={toggleSidebar} />
            </Col>

            {/* Main Dashboard */}
            <div className={`main-content ${open ? "content-open" : "content-closed"}`}>
                {/* Header Section */}
                <Row className="header-container align-items-center px-2 mb-2">
                    <Col className='searchbar-container'>
                        <InputGroup className='searchbox'>
                            <InputGroup.Text className='search-icon'>
                                <FaSearch />
                            </InputGroup.Text>
                            <Form.Control type="search" placeholder="Search..." className='searchbar-input' />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mt-4">
                    {/* Clock In/Out Card */}
                    <Col md={4} lg={4}>
                        <Card className="p-4 text-center shadow-sm clock-card h-100">
                            <div className="d-flex align-items-center mb-3">
                                <FaClock size={28} className="text-primary me-2" />
                                <h4 className="card-title m-0">Attendance Tracker</h4>
                            </div>
                            <hr className="w-100 mx-auto mt-2" />

                            {/* Clock In/Out Buttons */}
                            <div className="d-flex gap-3 justify-content-center">
                                <Button
                                    variant="success"
                                    className="mx-2 btn-lg"
                                    onClick={handleClockIn}
                                >
                                    Clock In
                                </Button>

                                <Button
                                    variant="danger"
                                    className="btn-lg"
                                    onClick={handleClockOut}
                                >
                                    Clock Out
                                </Button>
                            </div>

                            {/* Display Clock In/Out Time */}
                            <div className="mt-3">
                                <p>Clock In Time: {clockInTime ? clockInTime.toLocaleString() : "Not clocked in"}</p>
                                <p>Clock Out Time: {clockOutTime ? clockOutTime?.toLocaleString() : "Not clocked out"}</p>
                            </div>

                            <hr />
                            <p className="text-muted">Lunch Break: 1:00 PM - 2:00 PM</p>

                            {/* Start Break & Clock Out Buttons */}
                            <div className="d-flex justify-content-center gap-3">

                                <Button variant="warning" className="btn-lg" onClick={handleBreakTime}>Start Break</Button>

                                <Button variant="secondary" className="btn-lg" onClick={handleBreakEndTime}>End Break</Button>
                            </div>

                            {/* Display Break Start/End Time */}
                            <div className="mt-3">
                                <p>Start Break Time: {displayStartBreakTime}</p>

                                {startBreakTime && <p><strong>End Break Time:</strong> {fixedEndBreakTime}</p>}
                            </div>
                        </Card>
                    </Col>

                    {/* Calendar & Scheduled Tasks Card */}
                    <Col md={8} lg={8}>
                        <Card className="p-4 text-center shadow-sm calendar-card h-100">
                            <div className="d-flex align-items-center mb-3">
                                <FaCalendarAlt size={28} className="text-primary me-2" />
                                <h4 className="card-title m-0">Task Calendar</h4>
                            </div>
                            <hr className="w-100 mx-auto mt-2" />

                            <Row className="align-items-start">
                                {/* Calendar Section */}
                                <Col md={6} className="border-end text-center">
                                    <div class="datepicker-container p-3 rounded shadow-sm">
                                        <Form.Label className="d-flex align-items-center">
                                            <FaCalendarAlt
                                                className="me-2 text-primary cursor-pointer"
                                                size={20}
                                                onClick={() => setIsOpen(true)}
                                                style={{ cursor: 'pointer' }}
                                            /> Select Date
                                        </Form.Label>
                                        {/* Date picker */}
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => { setSelectedDate(date); setIsOpen(false) }}
                                            dateFormat="dd/MM/yyyy"
                                            open={isOpen}
                                            onClickOutside={() => setIsOpen(false)}
                                        />
                                        {/* Display Selected Date */}
                                        {/* <Form.Group className="mt-3">
                                            <Form.Label>Selected Date</Form.Label>
                                            <Form.Control type="text" value={selectedDate.toDateString()} readOnly />
                                        </Form.Group> */}
                                    </div>

                                    {/* Task Input */}
                                    <div className="mt-3 p-3 rounded shadow-sm">
                                        <h6>Add Task</h6>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Task"
                                            value={task}
                                            onChange={(e) => setTask(e.target.value)}
                                        />

                                        {/* Time Picker */}
                                        <InputGroup className="mt-2">
                                            <InputGroup.Text>
                                                <FaClock />
                                            </InputGroup.Text>
                                            <Form.Control
                                                w type="time"
                                                value={taskTime}
                                                onChange={(e) => setTaskTime(e.target.value)}
                                            />
                                        </InputGroup>
                                        <Button className="mt-2 w-100" onClick={addTasks}>Add Task</Button>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    {/* Scheduled Tasks Section */}
                                    <h5 className="mt-3 task-title">Tasks for {selectedDate.toDateString()}</h5>
                                    <ul className="list-group task-list">
                                        {tasks.filter((t) => t.date === selectedDate.toDateString()).length > 0 ? (
                                            tasks
                                                .filter((t) => t.date === selectedDate.toDateString())
                                                .map((task) => (
                                                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                        <span>
                                                            <FaTasks className="me-2 text-secondary" />
                                                            {task.task}
                                                        </span>
                                                        <span className="badge bg-primary">{task.time}</span>
                                                    </li>
                                                ))
                                        ) : (
                                            <p className="text-muted">No tasks scheduled.</p>
                                        )}
                                    </ul>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Attendance Management */}
                <Row className="mt-4">
                    <Col md={12}>
                        <Card className="p-4 shadow-sm">
                            <h4 className="text-center">Attendance Management Sheet</h4>

                            <Row className="mb-3">
                                <Col md={5}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        placeholderText="Start Date"
                                        className="form-control"
                                    />
                                </Col>
                                <Col md={5}>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        placeholderText="End Date"
                                        className="form-control"
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button onClick={handleFilter}>Filter</Button>
                                </Col>
                            </Row>

                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                                                Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓') : ''}
                                            </th>
                                            <th onClick={() => handleSort('clockInTime')} style={{ cursor: 'pointer' }}>
                                                Clock In Time {sortConfig.key === 'clockInTime' ? (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓') : ''}
                                            </th>
                                            <th onClick={() => handleSort('clockOutTime')} style={{ cursor: 'pointer' }}>
                                                Clock Out Time {sortConfig.key === 'clockOutTime' ? (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓') : ''}
                                            </th>
                                            <th>Total Hours</th>
                                            <th>Break Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {filteredRecords.length > 0 ? (
                                            filteredRecords.map((record, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                                    <td>{record.clockInTime}</td>
                                                    <td>{record.clockOutTime || 'N/A'}</td>
                                                    <td>{record.totalHours || 'N/A'}</td>
                                                    <td>{record.breakTime || 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No records found</td>
                                            </tr>
                                        )} */}
                                        {records.length > 0 ? (
                                            records.map((record, index) => (
                                                <tr key={index}>
                                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                                    <td>{record.clockInTime}</td>
                                                    <td>{record.clockOutTime || 'N/A'}</td>
                                                    <td>{record.totalHours || 'N/A'}</td>
                                                    <td>{record.startBreakTime || 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No records found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container >
    )
}

export default TimeTracking;