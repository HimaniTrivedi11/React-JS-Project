import React from 'react';
import { Container, Row, Col, Card, Button, Breadcrumb, Carousel } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import './AboutUs.css';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';
import ourMission from '../assets/our mission.jpg';
import member1 from '../assets/avatar/girl-1.jpg';
import member2 from '../assets/avatar/man-2.jpg';
import member3 from '../assets/avatar/girl-2.jpg';
import member4 from '../assets/avatar/man-3.jpg';
import AboutUsImage from '../assets/about us.jpg';

const AboutUs = () => {
    return (
        <div>
            <AppNavbar />
            <header className="contact-header">
                <Container fluid className="p-0">
                    <Row>
                        <Col className="text-center">
                            <div className="rectangle-container">
                                <img
                                    src={AboutUsImage}
                                    alt="About Us"
                                    className="about-image"
                                />
                                <h1 className="rectangle-text">ABOUT US</h1>

                                {/* Breadcrumbs */}
                                <Breadcrumb className="breadcrumb-inside">
                                    <Breadcrumb.Item href="/">
                                        <FaHome /> Home
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>

            <Container fluid className="about-us-container">
                {/* Our Mission Section */}
                <Row className="py-5">
                    <Col sm={12} md={6} className="text-center">
                        <h2>Our Mission</h2>
                        <ul className="mission-list">
                            <li>Empowering individuals, teams, and businesses to maximize productivity.</li>
                            <li>Providing a user-friendly platform for time tracking and task management.</li>
                            <li>Helping you stay focused and meet deadlines effortlessly.</li>
                            <li>Enhancing collaboration with smart project management tools.</li>
                            <li>Offering insightful analytics to help users make data-driven decisions.</li>
                        </ul>

                    </Col>
                    <Col sm={12} md={6}>
                        <img
                            src={ourMission}
                            alt="Mission"
                            className="img-fluid rounded"
                        />
                    </Col>
                </Row>

                {/* Team Section (Optional) */}
                <Row className="py-5">
                    <Col>
                        <h2 className="text-center mb-4">Meet Our Team</h2>
                        <Row>
                            {[
                                { name: "Jane Doe", role: "CEO & Founder", img: member1, bio: "A visionary leader with a passion for productivity and innovation." },
                                { name: "John Smith", role: "Product Manager", img: member2, bio: "Ensuring seamless product experience with great UI/UX insights." },
                                { name: "Sarah Lee", role: "Lead Developer", img: member3, bio: "Expert in full-stack development and AI-powered solutions." },
                                { name: "Michael Brown", role: "Marketing Head", img: member4, bio: "Crafting strategies that drive growth and brand awareness." },
                            ].map((member, index) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card className="team-card">
                                        <Card.Img variant="top" src={member.img} alt={member.name} />
                                        <Card.Body>
                                            <Card.Title>{member.name}</Card.Title>
                                            <Card.Text>{member.role}</Card.Text>
                                            <Card.Text>{member.bio}</Card.Text>
                                            <Button variant="outline-primary">LinkedIn</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>


                {/* Testimonials Section */}
                <Row className="py-5 bg-light">
                    <Carousel fade interval={5000} pause={false} className="testimonial-carousel">
                        <Carousel.Item>
                            <div className="testimonial-content">
                                <p>"TimeTrackerHub transformed the way we manage our tasks and projects. It’s intuitive and easy to use."</p>
                                <footer className="blockquote-footer">John Doe, CEO & Founder</footer>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="testimonial-content">
                                <p>"A great tool for tracking time and productivity. The reports are detailed and incredibly useful."</p>
                                <footer className="blockquote-footer">Jane Smith, Product Manager</footer>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="testimonial-content">
                                <p>"TimeTrackerHub has significantly improved our workflow efficiency. The intuitive interface makes task management seamless!"</p>
                                <footer className="blockquote-footer">Sarah Lee, Lead Developer</footer>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="testimonial-content">
                                <p>"An essential tool for freelancers! Helps me track my hours accurately and provides detailed insights into my work patterns."</p>
                                <footer className="blockquote-footer">Michael Brown, Marketing Head</footer>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Row>

                

                {/* Call to Action */}
                <Row className="py-5 text-center">
                    <Col>
                        <h3>Start Saving Time Today!</h3>
                        <p>Join thousands of professionals using TimeTrackerHub to stay organized and productive.</p>
                        <Button href="/register" variant="primary" size="lg">Sign Up for Free</Button>

                    </Col>
                </Row>
            </Container>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default AboutUs;
