import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert, Badge, Form, ListGroup } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../pages/TeamMemberStatus.css';
import userImage from '../assets/avatar/man-3.jpg';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { Line, Bar } from 'react-chartjs-2';  // Import the Line chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import html2pdf from 'html2pdf.js';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const TeamMemberStatus = () => {
    //Sidebar Toggle
    const [open, setOpen] = useState(true);
    const toggleSidebar = () => setOpen(!open);

    const [status, setStatus] = useState('Available');
    const [tasks] = useState([
        { id: 1, title: 'Code Review', progress: 60, dueDate: '2025-03-05' },
        { id: 2, title: 'Deploy App', progress: 85, dueDate: '2025-03-06' },
        { id: 3, title: 'React Project Review', progress: 45, dueDate: '2025-03-01' },
    ]);

    const handleStatusChange = (newStatus) => setStatus(newStatus);

    // Search Tasks
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Get Today's Date
    const today = new Date().toISOString().split('T')[0];

    const tasksDueToday = tasks.filter(task => task.dueDate === today);

    // Graph Data (simulated progress over 7 days)
    const graphData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Days of the week
        datasets: [
            {
                label: 'Performance Progress',
                data: [60, 34, 70, 23, 80, 85, 78], // Example performance data
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75, 132, 192, 0.2)',
                fill: true,
                tension: 0.4, // Adds smooth curve to the line
            },
        ],
    };

    const graphOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    const taskCompletionData = {
        labels: tasks.map(task => task.title),
        datasets: [
            {
                labels: "Progress",
                data: tasks.map(task => task.progress),
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                BorderWidth: 1,
            }
        ],
    };

    const exportChartToPDF = () => {
        const element = document.getElementById('chart-container'); // Get chart container
        const options = {
            filename: 'task-completion-overview.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    const exportPerformanceToPDF = () => {
        const element = document.getElementById('export-container'); // Get entire container
        const options = {
            filename: 'performance-analytics-overview.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };
    // Calculate Average Progress
    const averageProgress = Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length);

    return (
        <Container fluid className='mt-1'>
            {/* Sidebar */}
            <Col md={2} className='p-0'>
                <Sidebar open={open} toggleSidebar={toggleSidebar} />
            </Col>

            {/* Main Contents */}
            <div className={`main-content ${open ? "content-open" : "content-closed"}`}>
                {/* Profile and Status */}
                <Row className='profile-status-section'>
                    {/* User Profile */}
                    <Col lg={4} md={6} sm={12} className='mb-3 user-profile-card'>
                        <Card className='border-0 h-100'>
                            <Card.Header className='text-center profile-header'>
                                <h4>User Profile</h4>
                            </Card.Header>
                            <Card.Body className='profile-body'>
                                <div className='text-center'>
                                    <img
                                        src={userImage}
                                        alt='profile'
                                        className='rounded-circle mb-3 profile-img'
                                    />
                                    <h5 className='fw-bold'>John Doe</h5>
                                    <p className='text-muted'>Software Developer</p>

                                    <Alert variant={status === 'Available' ? 'success' : status === 'In a Meeting' ? 'warning' : 'danger'}
                                        className='d-flex align-items-center justify-content-center'
                                    >
                                        {status === 'Available' ? <FaCheckCircle className='me-2' /> :
                                            status === 'In a Meeting' ? <FaExclamationTriangle className='me-2' /> :
                                                <FaTimesCircle className='me-2' />}
                                        <span>Status: {status}</span>
                                    </Alert>

                                    <div className='d-flex justify-content-center flex-wrap gap-2'>
                                        <Button variant='success' onClick={() => handleStatusChange('Available')}>Available</Button>
                                        <Button variant="warning" onClick={() => handleStatusChange("In a Meeting")}>In a Meeting</Button>
                                        <Button variant="danger" onClick={() => handleStatusChange("Do Not Disturb")}>Do Not Disturb</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Reminder Section */}
                    <Col lg={4} md={6} sm={12} className='mb-3'>
                        <Card className='h-100 border-0 notification-card'>
                            <Card.Header className='rounded-top'>
                                <h4>Reminder</h4>
                            </Card.Header>
                            <Card.Body>
                                {tasks.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {tasks.map(task => (
                                            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                                                <strong>{task.title}</strong>
                                                <Badge bg="secondary">Due: {task.dueDate}</Badge>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="text-center text-muted">No reminders available.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Recent Updates Section */}
                    <Col lg={4} md={12} sm={12} className='mb-3'>
                        <Card className='h-100 border-0 rounded reminder-section'>
                            <Card.Header className='rounded-top'>
                                <h4>Recent Updates</h4>
                            </Card.Header>
                            <Card.Body>
                                <ul className='list-unstyled mb-0'>
                                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Task "React Development" is 85% completed!</li>
                                    <li className="mb-2"><FaExclamationTriangle className="text-warning me-2" /> "Bug Fixing" is pending.</li>
                                    <li className="mb-2"><FaCheckCircle className="text-success me-2" /> Task "React Development" is 45% completed!</li>
                                    <li className="mb-2"><FaExclamationTriangle className="text-warning me-2" /> "Bug Fixing" is pending.</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Task Tracker */}
                <Row className='mt-3'>
                    <Col sm={12} className='task-tracker-card'>
                        <Card className='border-0 rounded'>
                            <Card.Header className='d-flex justify-content-between align-items-center'>
                                <h4 className='mb-0'>Current Tasks</h4>
                                <Form.Group className='d-flex align-items-center mb-0'>
                                    <Form.Control
                                        type="text"
                                        placeholder="🔍 Search Task..."
                                        className="rounded-pill px-3"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Form.Group>
                            </Card.Header>
                            <Card.Body>
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map(task => (
                                        <Card key={task.id} className="mb-3 task-item shadow-sm border-light">
                                            <Card.Body>
                                                <Row className="align-items-center">
                                                    {/* Task Title & Due Date */}
                                                    <Col sm={8}>
                                                        <h5 className="fw-bold">{task.title}</h5>
                                                        <Badge
                                                            bg={new Date(task.dueDate) < new Date() ? "danger" : "warning"}
                                                            className="p-2"
                                                        >
                                                            📅 {task.dueDate}
                                                        </Badge>
                                                    </Col>

                                                    <Col sm={4} className="text-end">
                                                        <span className={`fw-bold ${task.progress < 30 ? "text-danger"
                                                            : task.progress < 70 ? "text-warning"
                                                                : "text-success"}`}>
                                                            {task.progress < 30 ? "⏳ Starting..."
                                                                : task.progress < 70 ? "🔄 Working on it..."
                                                                    : "🎉 Completed!"}
                                                            <span className="ms-2">({task.progress}%)</span>
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-center text-muted">🚀 No tasks yet, let's get started!</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Performance Analytics Section */}
                <Row className="mt-4 analytics-section">
                    {/* Performance Analytics */}
                    <Col xs={12} md={6} className="mb-4">
                        <Card className="h-100">
                            <Card.Header>
                                <h4 className="text-center">Performance Analytics</h4>
                            </Card.Header>
                            <Card.Body>
                                <div id="export-container">
                                    <p className="text-center text-md-start">Average Task Progress: {averageProgress}%</p>
                                    <div style={{ minHeight: '300px' }}>
                                        <Line
                                            data={graphData}
                                            options={{ responsive: true, maintainAspectRatio: false }}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center justify-content-md-end">
                                <Button variant="primary" onClick={exportPerformanceToPDF} className="w-100 w-md-auto mt-2">
                                    Export as PDF
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* Task Completion Overview */}
                    <Col xs={12} md={6} className="mb-4">
                        <Card className="h-100">
                            <Card.Header>
                                <h4 className="text-center">Task Completion Overview</h4>
                            </Card.Header>
                            <Card.Body>
                                <div id="chart-container">
                                    <div style={{ minHeight: '300px' }}>
                                        <Bar
                                            data={taskCompletionData}
                                            options={{ responsive: true, maintainAspectRatio: false }}
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center justify-content-md-end">
                                <Button variant="primary" onClick={exportChartToPDF} className="w-100 w-md-auto mt-2">
                                    Export as PDF
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>


            </div>
        </Container>
    );
};

export default TeamMemberStatus;