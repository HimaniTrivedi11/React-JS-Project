import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaBars, FaHome, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { FiGrid, FiClock, FiList, FiAlertCircle } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import "./AppSidebar.css";
// import avatarImage from "./images/girl.jpg";

const AppSidebar = ({ open, toggleSidebar }) => {
  // const [open, setOpen] = useState(true); // State for toggling the sidebar
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false); // Manage sub-menu state

  // Toggle Sidebar
  // const toggleSidebar = () => {
  //   // setOpen(!open);
  //   setSubMenuOpen(false); // Close all submenus when sidebar is toggled
  // };

  // Toggle Submenu
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen); // Toggle submenu visibility
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <Navbar className="navbar-custom">
          <Button
            variant="light"
            onClick={toggleSidebar}
            className={`navbar-button ${open ? "" : "closed"}`}
            aria-label={open ? "Close Sidebar" : "Open Sidebar"}
          >
            {open ? <FaTimes /> : <FaBars />} 
          </Button>
        </Navbar>

        {/* Sidebar Navigation Items */}
        <Nav className="flex-column">
          <Nav.Link href="/" className="nav-item">
            <FaHome className="icon" /> {open && "Home"}
          </Nav.Link>
          <Nav.Link href="/dashboard" className="nav-item">
            <FiGrid className="icon" /> {open && "Dashboard"}
          </Nav.Link>
          <Nav.Link href="/time-tracking" className="nav-item">
            <FiClock className="icon" /> {open && "Time Tracking"}
          </Nav.Link>
          <Nav.Link href="/tasks" className="nav-item">
            <FiList className="icon" /> {open && "Tasks"}
          </Nav.Link>
          <Nav.Link href="/attendance" className="nav-item">
            <FaClipboardUser className="icon" /> {open && "Attendance"}
          </Nav.Link>
          <Nav.Link href="/report" className="nav-item">
            <FaFileAlt  className="icon" /> {open && "Report"}
          </Nav.Link>
          <Nav.Link href="/status" className="nav-item">
            <FiAlertCircle className="icon" /> {open && "Status"}
          </Nav.Link>

          <Nav.Link href="/logout" className="nav-item logout">
            <FaSignOutAlt className="icon" /> {open && "Logout"}
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default AppSidebar;
