import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import LightLogo from "../assets/logo white.png";
import DarkLogo from "../assets/TimeTrackerHub.png";
import { Link } from "react-router-dom";
import "../components/AppNavbar.css";

const AppNavbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if there's a valid token in localStorage (or your global state)
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // User is logged in
        } else {
            setIsAuthenticated(false); // User is not logged in
        }
    }, []);

    // Handle Logout
    const onLogout = () => {
        // Clear token and userEmail from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');

        // After logout, update authentication status
        setIsAuthenticated(false);

        // Optionally, redirect to login page (if needed)
        window.location.href = '/';
    };

    const [expanded, setExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 50);
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check if the token exists in localStorage to determine if the user is logged in
    const isLoggedIn = localStorage.getItem('token') !== null;


    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`navbar ${isScrolled ? "scrolled" : ""}`}
            expanded={expanded}
        >
            <Container fluid>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/">
                    <img src={isScrolled ? DarkLogo : LightLogo} alt="Logo" className="navbar-logo" />
                </Navbar.Brand>

                {/* Navbar Toggle */}
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    className={`navbar-toggle ${expanded ? "open" : ""}`}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? <FaTimes className="toggle-icon close-icon" /> : <FaBars className="toggle-icon open-icon" />}
                </Navbar.Toggle>

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto nav-buttons" onClick={() => setExpanded(false)}>
                        <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>

                        {/* Features Dropdown */}
                        <NavDropdown
                            title={<span className="dropdown-title">{isScrolled ? "Features" : "Features"}</span>}
                            id="features-dropdown"
                            show={isDropdownOpen}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <NavDropdown.Item as={Link} to="/time-tracking">Time Tracking</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/task-list">Tasks</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/reports">Team Status</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/about-us" className="nav-link-custom">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact-us" className="nav-link-custom">Contact Us</Nav.Link>

                        {/* Login & Signup Buttons (Centered in Mobile) */}
                        {!isAuthenticated ? (
                            <>
                                <Button as={Link} to="/login" className="button-login me-3">Login</Button>
                                <Button as={Link} to="/register" className="button-signup">Sign Up</Button>
                            </>
                        ) : (
                            <Button onClick={onLogout} className="button-logout">Logout</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
