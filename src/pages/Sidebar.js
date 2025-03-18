import { useState } from "react";
import { Container, Navbar, ListGroup, Button } from "react-bootstrap";
import { FiHome, FiGrid, FiClock, FiList, FiAlertCircle, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaClipboardUser } from "react-icons/fa6";
import { MdHolidayVillage } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";
import logo from '../assets/TimeTrackerHub.png';

const Sidebar = ({ open, toggleSidebar }) => {

  // const [subMenuOpen, setSubMenuOpen] = useState(false);
  // const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation(); // Get current URL for active link

  // const toggleSidebar = () => setShowSidebar(!showSidebar);
  // const toggleSidebar = () => {
  //   // setOpen(!open);
  //   setSubMenuOpen(false);
  // }

  // const toggleSubMenu = () => {
  //   setSubMenuOpen(!subMenuOpen);
  // }

  // Sidebar menu items
  const menuItems = [
    { name: "Home", icon: <FiHome />, link: "/" },
    { name: "Dashboard", icon: <FiGrid />, link: "/dashboard" },
    { name: "Time Tracking", icon: <FiClock />, link: "/time-tracking" },
    { name: "Tasks", icon: <FiList />, link: "/task-list" },
    // { name: "Attendance", icon: <FaClipboardUser />, link: "/attendance" },
    // { name: "Leave", icon: <MdHolidayVillage />, link: "/leave" },
    { name: "Status", icon: <FiAlertCircle />, link: "/team-member-status" },
    { name: "Logout", icon: <FiLogOut />, link: "/logout", className: "text-danger" },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar Header with Toggle Button */}
        <div className="sidebar-header">
          <Button
            variant="light"
            onClick={toggleSidebar}
            className="sidebar-toggle-btn"
            aria-label={open ? "Close Sidebar" : "Open Sidebar"}
          >
            {open ? <IoIosArrowBack size={24} className="icons" /> : <FiMenu size={24} />}
          </Button>
        </div>

        {/* Logo only When Open Sidebar */}
        {open && (
          <div className="sidebar-logo d-flex flex-column align-items-center">
            <img src={logo} alt="Brand Logo" className="img-fluid" />
          </div>
        )}

        {/* Sidebar Menu */}
        <ListGroup variant="flush">
          {menuItems.map(item => (
            <ListGroup.Item
              key={item.link}
              action
              href={item.link}
              className={`d-flex align-items-center ${location.pathname === item.link ? "active" : ""} ${item.className || ""}`}
            >
                {item.icon} {open && <span className="ms-2">{item.name}</span>}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Sidebar;
