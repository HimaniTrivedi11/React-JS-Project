import React, { useState, useEffect } from "react";
import { Container, Col, Card, Table, Button, Badge, Form, ListGroup, Modal } from "react-bootstrap";
import Sidebar from './Sidebar';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import '../pages/TaskList.css';
import axios from "axios";

const TaskList = () => {

    // Toggle Sidebar function
    const [open, setOpen] = useState(true);
    const toggleSidebar = () => {
        setOpen(!open);
    };

    const [users, setUsers] = useState([]);
    const STATUS = {
        ACTIVE: "Active",
        INACTIVE: "Inactive"
    };


    const [newTask, setNewTask] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [editTask, setEditTask] = useState({ userId: null, index: null, value: "" });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tasks");
                setUsers(response.data); // Directly set the fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Toggle Status
    const toggleStatus = async (id) => {
        const updatedUsers = users.map((user) =>
            user.id === id
                ? {
                    ...user,
                    status: user.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE,
                }
                : user
        );
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedUsers.find(user => user.id === id));
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Add Task
    const addTask = async () => {
        if (newTask.trim() !== "" && selectedUser !== null) {
            const updatedUsers = users.map((user) =>
                user.id === selectedUser ? { ...user, tasks: [...user.tasks, newTask] } : user
            );
            try {
                await axios.put(`http://localhost:5000/api/tasks/${selectedUser}`, updatedUsers.find(user => user.id === selectedUser));
                setUsers(updatedUsers);
                setNewTask("");
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    // Edit Task
    const updateTask = async () => {
        const updatedUsers = users.map((user) =>
            user.id === editTask.userId
                ? {
                    ...user,
                    tasks: user.tasks.map((task, index) => (index === editTask.index ? editTask.value : task)),
                }
                : user
        );
        try {
            await axios.put(`http://localhost:5000/api/tasks/${editTask.userId}`, updatedUsers.find(user => user.id === editTask.userId));
            setUsers(updatedUsers);
            setShowModal(false);
            setEditTask({ userId: null, index: null, value: "" });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Delete Task
    const deleteTask = async (userId, index) => {
        const userToUpdate = users.find((user) => user.id === userId);
        if (userToUpdate) {
            const updatedTasks = userToUpdate.tasks.filter((_, i) => i !== index);
            const updatedUser = { ...userToUpdate, tasks: updatedTasks };

            try {
                await axios.put(`http://localhost:5000/api/tasks/${userId}`, updatedUser);
                setUsers(users.map((user) => user.id === userId ? updatedUser : user));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };


    return (
        <Container fluid className="mt-4">
            {/* Sidebar */}
            <Col md={2} className='p-0'>
                <Sidebar open={open} toggleSidebar={toggleSidebar} />
            </Col>

            {/* Main Content */}
            <Col md={12}>

                <div className={`main-content ${open ? "content-open" : "content-closed"}`}>

                    <h2 className="text-center">User Task List</h2>

                    {/* User List */}
                    <div className="table-responsive mt-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <Badge bg={user.status === "Active" ? "success" : "secondary"}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td>{user.tasks ? user.tasks.length : 0}</td>
                                        <td>
                                            <Button variant="info" size="sm" style={{ width: "97px", padding: "2px 4px" }} onClick={() => setSelectedUser(user.id)}>
                                                View Tasks
                                            </Button>{" "}
                                            <Button variant="warning" size="sm" style={{ width: "97px", padding: "2px 4px" }} onClick={() => toggleStatus(user.id)}>
                                                Toggle Status
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Task Management */}
                    {selectedUser && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>Tasks for {users.find((u) => u.id === selectedUser)?.name}</Card.Title>
                                <Form.Group className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Add a new task"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                    <Button variant="primary" onClick={addTask} className="ms-2" style={{ padding: "2px 4px", width: "55%" }}>
                                        <FaPlus /> Add Task
                                    </Button>
                                </Form.Group>
                                <ListGroup className="mt-3">
                                    {users
                                        .find((user) => user.id === selectedUser)
                                        ?.tasks.map((task, index) => (
                                            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                                                <span>{task}</span>
                                                <div className="d-flex justify-content-between">
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="me-2 d-flex flex-grow-1 align-items-center justify-content-center"
                                                        style={{ padding: "2px 4px", gap: "4px" }}
                                                        onClick={() => {
                                                            setEditTask({ userId: selectedUser, index, value: task });
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        <FaEdit /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="d-flex flex-grow-1 align-items-center justify-content-center"
                                                        style={{ padding: "2px 4px", gap: "4px" }}
                                                        onClick={() => deleteTask(selectedUser, index)}
                                                    >
                                                        <FaTrash /> Delete
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                </ListGroup>

                                {/* Edit Task Modal */}
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Task</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Control
                                            type="text"
                                            value={editTask.value}
                                            onChange={(e) => setEditTask({ ...editTask, value: e.target.value })}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onCl ick={() => setShowModal(false)}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={updateTask}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Card.Body>
                        </Card>
                    )}

                </div>
            </Col>
        </Container>
    );
};

export default TaskList;
