import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row, Badge, Modal, InputGroup, FloatingLabel } from "react-bootstrap";
import userImage from '../assets/avatar/man-3.jpg';
import { BiBell, BiUser } from 'react-icons/bi';
// import { FiHome, FiGrid, FiClock, FiList, FiBarChart2, FiAlertCircle, FiLogOut, FiMenu } from "react-icons/fi";
import { Clock, Flag, Circle, PencilSquare, Trash, Plus } from "react-bootstrap-icons";
import { FaUser, FaClock, FaUsers, FaClipboardCheck, FaPlay, FaStop, FaSearch, FaRedo, FaListAlt, FaCalendarCheck, FaChartLine } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Sidebar from './Sidebar';
import './DashboardPage.css';

// Register chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const DashboardPage = () => {

  // Toggle Sidebar function
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // State for Search bar
  const [showInput, setShowInput] = useState(false);

  // Notification
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, message: "New message from Admin" },
    { id: 2, message: "Your profile was updated" },
    { id: 3, message: "New comment on your post" }
  ];

  // State for timer
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(60);
  const [endTime, setEndTime] = useState(null);

  // Timer state using useRef for intervalId
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const now = Date.now();
      setEndTime(now + (duration - timeElapsed) * 1000);

      intervalRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => {
          if (prevTime >= duration) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
}, [isRunning, duration]);


  // handle start and stop timer
  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimeElapsed(0);
    } else {
      setIsRunning(false);
    }
  };

  //handle reset timer
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setIsRunning(false);
  }

  // Handle Minutes Input
  const handleMinutesChange = (e) => {
    const minutes = parseInt(e.target.value, 10) || 0; // Default to 0 if empty
    setDuration(minutes * 60 + (duration % 60));
  };

  // Handle Seconds Input
  const handleSecondsChange = (e) => {
    const seconds = parseInt(e.target.value, 10) || 0;
    setDuration(Math.floor(duration / 60) * 60 + seconds);
  };

  //format time display
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  };

  // Calculate progress percentage (100% at start, 0% at completion)
  const progress = ((duration - timeElapsed) / duration) * 100;

  // tasks overview datasets
  const [task, setTasks] = useState([
    { title: "Project 1", empId: "1259", dueDate: "12/08/2019", status: "Overdue" },
    { title: "Project 2", empId: "abc1", dueDate: "12/19/2019", status: "In Progress" },
    { title: "Project 3", empId: "1375", dueDate: "12/20/2019", status: "Pending" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [newTask, setNewTask] = useState({ title: "", empId: "", dueDate: "", status: "Pending" });


  //Handle opening model
  const handleEdit = (task, index) => {
    setEditTask({ ...task, index });
    setShowModal(true);
  };

  //Handle saving edited task
  const handleSave = () => {
    const updatedTasks = [...task];
    updatedTasks[editTask.index] = { ...editTask };
    setTasks(updatedTasks);
    setShowModal(false);
  };

  // Open Add Task Modal
  const handleAddTask = () => {
    setNewTask({ title: "", caseId: "", dueDate: "", status: "Pending" });
    setShowAddModal(true);
  };

  //Handle deleting a task
  const handleDelete = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Save New Task
  const handleSaveNewTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([...task, newTask]);
      setShowAddModal(false);
    }
  };

  // Task Overview chart data
  const taskData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [3, 5, 4, 6, 8, 5, 9],
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
      {
        label: 'Tasks Incomplete',
        data: [2, 9, 5, 3, 8, 1, 3],
        fill: false,
        borderColor: '#F08080',
        tension: 0.1,
      },
    ],
  };

  return (
    <Container fluid className="mt-3">
      {/* Sidebar */}
      <Col md={2} className='p-0'>
        <Sidebar open={open} toggleSidebar={toggleSidebar} />
      </Col>

      {/* Main Dashboard */}
      <div className={`main-content ${open ? "content-open" : "content-closed"}`}>
        <Col md={12}>
          {/* Header */}
          <Row className="header-container align-items-center px-3">
            {/* Search Bar  */}
            <Col className='searchbar-container'>
              <InputGroup className='searchbox'>
                <InputGroup.Text className='search-icon'>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control type="search" placeholder="Search..." className='searchbar-input' />
              </InputGroup>
            </Col>

            {/* User Info */}
            <Col md={5} className="d-flex justify-content-end align-items-center gap-1">
              {isAuthenticated ? (
                <div className="user-info d-flex align-items-center">
                  <BiUser className="fs-4 me-2" />  {/* User Icon Instead of Name */}
                </div>
              ) : null}

              <div className="notifications position-relative">
                {/* Bell Icon - Click to Toggle Notifications */}
                <BiBell className="fs-4" onClick={() => setShowNotifications(!showNotifications)} style={{ cursor: "pointer" }} />

                {/* Notification Count Badge */}
                {notifications.length > 0 && (
                  <span className="notification-count position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {notifications.length}
                  </span>
                )}

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="notification-list position-absolute bg-white shadow-lg p-2" style={{ top: "30px", right: "0", width: "250px", borderRadius: "8px" }}>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item p-2 border-bottom">
                          {notification.message}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-muted">No new notifications</div>
                    )}
                  </div>
                )}
              </div>
            </Col>

          </Row>
        </Col>

        {/* Main Content */}
        <Row className="mb-4">
          <Col xs={12}>
            <h3 className="mt-2 mb-4" style={{ textAlign: "start", fontSize: "22px" }}>Welcome Back!</h3>
            {/* Metrics */}
            <Row className="g-3">
              {[
                { icon: <FaListAlt />, title: "My Tasks ", value: 5 },
                { icon: <FaClock />, title: "Hours Logged Today", value: 5 },
                { icon: <FaCalendarCheck />, title: "Upcoming Deadlines", value: 2 },
                { icon: <FaChartLine />, title: "Task Completion Rate", value: "90%" },
              ].map((item, index) => (
                <Col key={index} md={3}>
                  <Card className="shadow-sm p-3 mb-2 bg-white rounded h-100 text-center">
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <Card.Title className="fw-bold d-flex align-items-center gap-2" style={{ fontSize: "20px" }}>
                        <span style={{ fontSize: "24px", color: "#007bff" }}>{item.icon}</span>
                        {item.title}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "22px", color: "#007bff", fontWeight: "bold" }}>
                        {item.value}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>


            {/* Task Analysis Card */}
            <Row className="mt-3 d-flex align-items-stretch mt-1" style={{ justifyContent: "space-between" }}>
              <Col md={8} className="mb-3">
                <Card className="h-100 shadow-sm rounded">
                  <Card.Body>
                    <Card.Title className="fw-bold text-center mb-4" style={{ fontSize: "24px", color: "#333" }}>Tasks Analysis</Card.Title>
                    <Line data={taskData} />

                    {/* Graph Description */}
                    <div className="mt-4">
                      <p className="fw-semibold" style={{ fontSize: "16px", color: "#007bff" }}>
                        Insights from your tasks this week:
                      </p>
                      <Row className="g-3">
                        {/* Completed Tasks */}
                        <Col xs={12} sm={6} md={4}>
                          <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center justify-content-between" style={{ minHeight: "100%" }}>
                            <FaClipboardCheck size={22} className="me-2" style={{ color: "#007bff" }} />
                            <div>
                              <span className="fw-semibold" style={{ fontSize: "14px" }}>Completed Tasks:</span>
                              <p className="mb-0" style={{ fontSize: "16px", fontWeight: "600", color: "#007bff" }}>5</p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                          <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center justify-content-between" style={{ minHeight: "100%" }}>
                            <FaPlay size={22} className="me-2" style={{ color: "#007bff" }} />
                            <div>
                              <span className="fw-semibold" style={{ fontSize: "14px" }}>Pending Tasks:</span>
                              <p className="mb-0" style={{ fontSize: "16px", fontWeight: "600", color: "#007bff" }}>3</p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                          <div className="p-3 bg-light rounded shadow-sm d-flex align-items-center justify-content-between" style={{ minHeight: "100%" }}>
                            <FaClock size={22} className="me-2" style={{ color: "#007bff" }} />
                            <div>
                              <span className="fw-semibold" style={{ fontWeight: "600", fontSize: "14px" }}>Time Spent Today:</span>
                              <p className="mb-0" style={{ fontSize: "16px", fontWeight: "600", color: "#007bff" }}>2 hours</p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Timer card */}
              <Col md={4} className="mb-4">
                <Card className="h-100 shadow-sm rounded-3">
                  <Card.Body className="d-flex flex-column align-items-center p-4">
                    <Card.Title className="fw-semibold" style={{ fontSize: "24px", color: "#333" }}>Time Tracker</Card.Title>

                    {/* Timer Inputs */}
                    <Form.Group controlId="customDuration" className="w-100 mt-3">
                      <Form.Label>Set Timer Duration:</Form.Label>
                      <div className="d-flex gap-2 justify-content-center">
                        <Form.Control
                          type="number"
                          min="0"
                          value={Math.floor(duration / 60)}
                          onChange={handleMinutesChange}
                          disabled={isRunning}
                          placeholder="Minutes"
                        />
                        <Form.Control
                          type="number"
                          min="0"
                          max="59"
                          value={duration % 60}
                          onChange={handleSecondsChange}
                          disabled={isRunning}
                          placeholder="Seconds"
                        />
                      </div>
                    </Form.Group>


                    {/* Circular Progress Bar */}
                    <div className="mt-4" style={{ width: "150px", height: "150px", textAlign: "center" }}>
                      <CircularProgressbar
                        value={progress}
                        text={formatTime(duration - timeElapsed)}
                        styles={buildStyles({
                          textSize: '18px',
                          pathColor: progress === 0 ? '#ff0000' : '#4caf50',
                          textColor: '#000',
                          trailColor: '#e0e0e0',
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 w-100 d-flex justify-content-between gap-3">
                      <Button
                        variant={isRunning ? 'danger' : 'success'}
                        onClick={handleStartStop}
                      >
                        {isRunning ? 'Stop' : 'Start'}
                      </Button>

                      <Button onClick={handleReset}>
                        <FaRedo /> Reset
                      </Button>
                    </div>

                    {/* Time Summary */}
                    <div className="mt-4 w-100 text-center">
                      <h5 className="fw-bold" style={{ fontSize: "18px" }}>Time Summary</h5>
                      <p className="mb-1" style={{ fontSize: "16px" }}>Total Elapsed Time: {formatTime(timeElapsed)}</p>
                      <p className="mb-0" style={{ fontSize: "16px" }}>Target Time: {formatTime(duration)}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* TO-DO List Tasks */}
            <Row className="mt-1">
              <Card className="p-3 shadow-sm rounded" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Col md={12}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>
                      TO-DO Tasks <Badge bg="primary">{task.length}</Badge>
                    </h5>
                    <Button
                      variant="primary"
                      onClick={() => setShowAddModal(true)}
                      className="fw-bold"
                      style={{ width: "140px", padding: "8px 10px" }}
                    >
                      <Plus className="me-1" /> Add Task
                    </Button>
                  </div>

                  {task.map((task, index) => (
                    <Card key={index} className="mb-2 p-3 shadow-sm">
                      <Row className="align-items-center">
                        <Col md={7}>
                          <strong>{task.title}</strong>
                          <Badge bg="light" text="dark" className="ms-2">
                            {`Employee ${task.empId}`}
                          </Badge>
                          <div className="text-muted small">Due Date: {task.dueDate}</div>
                        </Col>

                        <Col md={3} className="text-end">
                          {task.status === "Overdue" && <Flag color="red" className="me-2" />}
                          {task.status === "In Progress" && <Clock color="orange" className="me-2" />}
                          {task.status === "Pending" && <Circle color="gray" className="me-2" />}
                          <Badge bg={task.status === "Overdue" ? "danger" : task.status === "In Progress" ? "warning" : "secondary"}>
                            {task.status}
                          </Badge>
                        </Col>

                        <Col md={2} className="text-end d-flex align-items-center">
                          <PencilSquare className="text-primary me-3" role="button" onClick={() => handleEdit(task, index)} />
                          <Trash className="text-danger" role="button" onClick={() => handleDelete(index)} />
                        </Col>
                      </Row>
                    </Card>
                  ))}

                  {/* Edit Task Modal */}
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Task Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={editTask?.title || ""}
                            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>EMP ID</Form.Label>
                          <Form.Control
                            type="text"
                            value={editTask?.caseId || ""}
                            onChange={(e) => setEditTask({ ...editTask, caseId: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={editTask?.dueDate || ""}
                            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* Add Task Modal */}
                  <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Task Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>EMP ID</Form.Label>
                          <Form.Control
                            type="text"
                            value={newTask.caseId}
                            onChange={(e) => setNewTask({ ...newTask, caseId: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Form.Select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Overdue">Overdue</option>
                          </Form.Select>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSaveNewTask}>
                        Add Task
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DashboardPage;
