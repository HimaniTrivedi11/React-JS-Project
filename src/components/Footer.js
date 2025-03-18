import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../components/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail(''); // Clear the input after submission
  };
  return (
    <footer className='footer py-4'>
      <Container fluid className='mt-3 p-0'>
        <Row className="justify-content-between mb-0">
          {/* About us section */}
          <Col md={3} sm={6} className='mb-4 text-center text-md-start flex-nowrap'>
            <h5>About Us</h5>
            <p>
              We are a passionate team dedicated to delivering high-quality solutions.
              Our mission is to provide exceptional user experiences through innovative design and technology.
            </p>
          </Col>

          {/* Quick Links Section */}
          <Col md={2} sm={6} className='text-center text-md-start'>
            <h5>Quick Links</h5>
            <ul className='list-unstyled'>
              <li><a href="/" className='footer-link'>Home</a></li>
              <li><a href="/about-us" className='footer-link'>About Us</a></li>
              {/* <li><a href="/feature" className='footer-link'>Feature</a></li> */}
              <li><a href="/contact-us" className='footer-link'>Contact Us</a>
              </li>
            </ul>
          </Col>

          <Col md={2} sm={6} className='text-center text-md-start'>
            <h5>Features</h5>
            <ul className='list-unstyled'>
              <li><a href="/time-tracking" className='footer-link'>Time Tracking</a></li>
              <li><a href="/task-list" className='footer-link'>Tasks</a></li>
              <li><a href="/team-member-status" className='footer-link'>Team Status</a>
              </li>
            </ul>
          </Col>

          {/* Contact Information Section */}
          <Col md={2} sm={6} className='text-center text-md-start'>
            <h5>Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Main Street, City, Country</p>
          </Col>

          {/* Subscription Box Section */}
          <Col md={3} sm={6} className='text-center d-flex flex-column align-items-center'>
            <h5>Subscribe to Our Newsletter</h5>
            <Form onSubmit={handleSubscribe} className="subscription-form w-100">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="subscribe-btn w-100">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        {/* Copyright */}
        <hr className='footer-divider my-4' />
        <p className="text-center mt-3 mb-0">
          © {new Date().getFullYear()} TimeTrackerHub. All Rights Reserved.
        </p>

      </Container>
    </footer>
  );
};

export default Footer;