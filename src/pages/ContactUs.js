import React, { useState } from "react";
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap";
import ContactUsImage from '../assets/contact us.jpg';
import { FaEnvelope, FaHome, FaLocationArrow, FaMapMarkedAlt, FaPhone } from "react-icons/fa";
import "../pages/ContactUs.css";
import AppNavbar from "../components/AppNavbar";
import Footer from '../components/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
    };

    return (
        <div className="contact-us">
            <AppNavbar />
            {/* Header Section */}
            <header className="contact-header">
                <Container fluid className="p-0">
                    <Row>
                        <Col className="text-center">
                            <div className="rectangle-container">
                                <img
                                    src={ContactUsImage}
                                    alt="Contact Us"
                                    className="contact-image"
                                />
                                <h1 className="rectangle-text">CONTACT US</h1>

                                {/* Breadcrumbs */}
                                <Breadcrumb className="breadcrumb-inside">
                                    <Breadcrumb.Item href="/">
                                        <FaHome /> Home
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>


            {/* Get In Touch Section */}
            <section className="get-in-touch py-5">
                <Container>
                    <Row className="text-center mb-5">
                        <Col md={3}>
                            <div className="contact-item">
                                <FaLocationArrow className="icon location-icon" size={25} />
                                <h5>Location</h5>
                                <p>Sunshine Business Park, 123, Paris Road, New York, USA</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="contact-item">
                                <FaPhone className="icon phone-icon" size={25} />
                                <h5>Contact</h5>
                                <p>+88(0) 555-0108 <br /> +88(0) 555-0119</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="contact-item">
                                <FaEnvelope className="icon email-icon" size={25} />
                                <h5>Email</h5>
                                <p>techco@example.com <br /> timetracker@gmail.com</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="contact-item">
                                <FaMapMarkedAlt className="icon calendar-icon" size={25} />
                                <h5>Visit Between</h5>
                                <p>Mon - Sat: 8:00 - 5:00 <br /> Sun: Closed</p>
                            </div>
                        </Col>
                    </Row>

                    {/* Contact Form */}
                    <Row>
                        <Col md={6}>
                            <h2 className="mb-3">Send Us A Message</h2>
                            <p>We'd love to hear from you! Fill out the form below to get in touch.</p>
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="name">
                                            <Form.Control
                                                type="text"
                                                placeholder="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                type="email"
                                                placeholder="Your Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="subject">
                                            <Form.Control
                                                type="text"
                                                placeholder="Your Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="phone">
                                            <Form.Control
                                                type="tel"
                                                placeholder="Your Phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12}>
                                        <Form.Group controlId="message">
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder="Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" className="w-100">
                                    Send Message
                                </Button>
                            </Form>
                            {isSubmitted && (
                                <p className="form-submission-message mt-4">
                                    Thank you for your message! We will get back to you soon.
                                </p>
                            )}
                        </Col>

                        {/* Google Map */}
                        <Col md={6}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8731497638145!2d-73.98189908459286!3d40.786549679325485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDDgDQ3JzExLjciTiA3M8KwNTgnNDMuMyJX!5e0!3m2!1sen!2sus!4v1636943345364!5m2!1sen!2sus"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                            ></iframe>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default ContactUs;
