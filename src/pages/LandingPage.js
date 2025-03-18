import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Clock, Lock, BarChart, Headphones } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../pages/LandingPage.css";
import CardTimesheet from "../assets/timesheet.png";
import CardActivity from "../assets/activity.png";
import CardTodo from "../assets/to-do list.png";
// import DashboardImage3 from "../assets/img1.png";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";

const LandingPage = () => {

    const scrollToSection = () => {
        const section = document.getElementById("stats");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div>
                <AppNavbar />
                <section className="hero-section">
                    <div className="bg-overlay"></div>
                    <Container>
                        <div className="hero-content">
                            <Row className="align-items-center mt-3">
                                <Col md={6} className="mt-5 text-center">
                                    <h1 className="mt-5 hero-title">Track Time,</h1>
                                    <h1 className="mt-1 hero-title">Boost Productivity</h1>
                                    <p>
                                        "Empower your team with an intuitive time tracking solution that saves time and boosts productivity. Designed to be easy, efficient, and effective."
                                    </p>

                                    {/* Get Start Button */}
                                    <button className="button" onClick={() => scrollToSection()}>
                                        <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                                            <path
                                                clipRule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                        Get Started
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>

                {/* Feature Section */}
                <section className="py-5" id="stats">
                    <Container className="text-center">
                        <div className="text-center d-flex flex-column align-items-center">
                            <h2 className="fw-bold mb-4">Time Management Features</h2>
                            <p className="mb-5">
                                "Effectively track work hours, monitor productivity, and gain valuable insights into work patterns with our intelligent time-tracking system. Analyze detailed reports tailored to your team’s workflow, identify areas for improvement, and optimize performance. With smart, customizable reporting features, you can make informed decisions, enhance efficiency, and drive success in your projects."
                            </p>
                        </div>
                        <Row className="justify-content-center g-4">
                            <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center">
                                <Card className="border-0 menu-card h-100">
                                    <Card.Img variant="top" src={CardTimesheet} alt="Timesheet Tracking" />
                                    <Card.Body className="p-3 text-center">
                                        <Card.Title className="fs-5 fw-bold">Timesheet</Card.Title>
                                        <Card.Text className="text-muted">
                                            Effortlessly track working hours with our intelligent timesheet system
                                        </Card.Text>
                                        <Button variant="primary" className="mt-auto w-100" href="/time-tracking">Fill Timesheet</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center">
                                <Card className="border-0 menu-card h-100">
                                    <Card.Img variant="top" src={CardCalendar} alt="Calendar" />
                                    <Card.Body className="p-3 text-center">
                                        <Card.Title className="fs-5 fw-bold">Calendar</Card.Title>
                                        <Card.Text className="text-muted">
                                            Seamlessly sync with your existing calendar for better planning
                                        </Card.Text>
                                        <Button variant="primary" className="mt-auto w-100">View Calendar</Button>
                                    </Card.Body>
                                </Card>
                            </Col> */}
                            <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center">
                                <Card className="border-0 menu-card h-100">
                                    <Card.Img variant="top" src={CardActivity} alt="Activity" />
                                    <Card.Body className="p-3 text-center">
                                        <Card.Title className="fs-5 fw-bold">Activity</Card.Title>
                                        <Card.Text className="text-muted">
                                            Discover key productivity trends, and optimize performance effortlessly.
                                        </Card.Text>
                                        <Button variant="primary" className="mt-auto w-100" href="/dashboard">Track  Activity</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={12} sm={6} md={3} className="mb-4 d-flex justify-content-center">
                                <Card className="border-0 menu-card h-100">
                                    <Card.Img variant="top" src={CardTodo} />
                                    <Card.Body className="p-3 text-center">
                                        <Card.Title className="fs-5 fw-bold">Tasks List</Card.Title>
                                        <Card.Text className="text-muted">
                                            Maintain an organized task list, and stay on top of your goals.
                                        </Card.Text>
                                        <Button variant="primary" className="mt-auto w-100" href="/task-list">Tasks List</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* StatsSection  */}
                <section className="stats-section py-5">
                    <Container>
                        <Row className="text-start d-flex align-items-center justify-content-center">
                            {/* 1st Stat */}
                            <Col xs={6} md={3} className="mb-4 mb-md-0 stats-col border-end text-center">
                                <h2 className="stat-number">10000+</h2>
                                <p className="stat-label">and counting 5-star reviews</p>
                            </Col>

                            {/* 2nd Stat */}
                            <Col xs={6} md={3} className="mb-4 mb-md-0 stats-col border-end text-center">
                                <h2 className="stat-number">129</h2>
                                <p className="stat-label">Countries used across the globe</p>
                            </Col>

                            {/* 3rd Stat */}
                            <Col xs={6} md={3} className="mb-4 mb-md-0 stats-col border-end text-center">
                                <h2 className="stat-number">16,000,000</h2>
                                <p className="stat-label">Hours tracked</p>
                            </Col>

                            {/* 3rd Stat */}
                            <Col xs={6} md={3} className="mb-4 mb-md-0 stats-col">
                                <h2 className="stat-number">300</h2>
                                <p className="stat-label">New teams monthly</p>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials-section py-5">
                    <Container>
                        <div className="text-center mb-4">
                            <div className="star-rating mb-2">
                                {/* 5 stars example */}
                                <FaStar color="#FFC107" />
                                <FaStar color="#FFC107" />
                                <FaStar color="#FFC107" />
                                <FaStar color="#FFC107" />
                                <FaStar color="#FFC107" />
                            </div>
                            <h2 className="section-title">Why teams love our platform</h2>
                        </div>

                        <Row className="gy-4">
                            {/* Testimonial #1 */}
                            <Col md={6}>
                                <div className="testimonial-box h-100">
                                    <p className="testimonial-text">
                                        "The UI design is visually pleasing and makes the program easy to
                                        use. The software can be easily customized for different types of
                                        projects. Time tracking is great and helps us account for time spent
                                        on any given project."
                                    </p>
                                    <p className="testimonial-author">
                                        <strong>Charles C.</strong>
                                        <br />
                                        <span className="testimonial-source">Reviewed on Capterra</span>
                                    </p>
                                </div>
                            </Col>
                            {/* Testimonial #2*/}
                            <Col md={6}>
                                <div className="testimonial-box h-100">
                                    <p className="testimonial-text">
                                        "This software has significantly improved our workflow. The intuitive UI and ease of use make managing projects a breeze. The ability to customize settings makes it suitable for different team sizes."
                                    </p>
                                    <p className="testimonial-author">
                                        <strong>Sarah M.</strong>
                                        <br />
                                        <span className="testimonial-source">Reviewed on Trustpilot</span>
                                    </p>
                                </div>
                            </Col>
                            {/* Testimonial #2*/}
                            <Col md={6}>
                                <div className="testimonial-box h-100">
                                    <p className="testimonial-text">
                                        "The reporting and analytics tools are top-notch. It's easy to track team productivity and project progress in real time. Customer support is also very responsive and helpful."
                                    </p>
                                    <p className="testimonial-author">
                                        <strong>David L.</strong>
                                        <br />
                                        <span className="testimonial-source">Reviewed on G2</span>
                                    </p>
                                </div>
                            </Col>
                            {/* Testimonial #2*/}
                            <Col md={6}>
                                <div className="testimonial-box h-100">
                                    <p className="testimonial-text">
                                        "I love how simple and effective this tool is. It integrates well with other software we use, and the time-tracking feature is incredibly accurate. Highly recommend for freelancers and businesses alike."
                                    </p>
                                    <p className="testimonial-author">
                                        <strong>Emily R.</strong>
                                        <br />
                                        <span className="testimonial-source">Reviewed on Software Advice</span>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*  Why Choose Our Time Tracking Solution? section */}
                <section className="bg-light py-5 text-center">
                    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100px", gap: "10px" }}>
                        <h2 className="text-center fw-bold mb-5">
                            Why Choose Our Time Tracking Solution?
                        </h2>
                        <Row>
                            <Col md={3} className="mb-4">
                                <Card className="h-100 text-center">
                                    <Card.Body>
                                        <Clock className="text-primary mb-3" size={40} />
                                        <Card.Title>Boost Productivity</Card.Title>
                                        <Card.Text>Track and optimize your team's time effectively</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="mb-4">
                                <Card className="h-100 text-center">
                                    <Card.Body>
                                        <Lock className="text-primary mb-3" size={40} />
                                        <Card.Title>Secure Platform</Card.Title>
                                        <Card.Text>Enterprise-grade security for your data</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="mb-4">
                                <Card className="h-100 text-center">
                                    <Card.Body>
                                        <BarChart className="text-primary mb-3" size={40} />
                                        <Card.Title>Accurate Reporting</Card.Title>
                                        <Card.Text>Detailed insights into time usage</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="mb-4">
                                <Card className="h-100 text-center">
                                    <Card.Body>
                                        <Headphones className="text-primary mb-3" size={40} />
                                        <Card.Title>24/7 Support</Card.Title>
                                        <Card.Text>Always here to help you succeed</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="py-3 text-black text-center cta-section">
                    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "120px", gap: "10px" }}>
                        <h2 className="fw-bold mb-2" style={{ color: "#0b5397" }}>
                            Work smarter, not harder – unlock your productivity potential
                        </h2>
                        <Button variant="light" size="md" as={Link} to="/register">
                            Create Free Account
                        </Button>
                    </Container>
                </section>

                {/* Footer Section */}
                <section className="mt-3">
                    <Footer />
                </section>
            </div>
        </>
    )
}

export default LandingPage;

