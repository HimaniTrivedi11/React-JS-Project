import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo white.png';
import '../components/Register.css';
import axios from 'axios';

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // For redirecting to the login page
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(''); // Reset error message on submit attempt

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Perform registration request
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage(response.data.message);
      setFormData({ email: '', password: '', confirmPassword: '' });

      const data = response.data;
      console.log("API Response:", data);

      if (response.status === 201) {
        localStorage.setItem('token', data.token); // Save JWT token
        alert('Registration successful! Redirecting to login...');
        navigate('/login'); // Redirect to the login page
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error in registration:', error);

      // Handle different error scenarios
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('Server is unreachable. Please check your connection.');
      }
    }
  };

  return (
    <div className="register-page">
      {/* Logo Section */}
      <div className="logo-container">
        <a href="/">
          <img src={Logo} alt="Brand Logo" className="logo-img" />
        </a>
      </div>

      <Container fluid className='register-container'>
        <Row className="row-container">
          <Card className='register-card' style={{ borderRadius: "25px", marginTop: "-20px" }}>
            <Row className='g-0'>

              {/* Left side register form */}
              <Col xs={12} md={6} className='form-section'>
                <Card.Body className='w-100'>
                  <h2 className='mb-2 fw-semibold text-center'>Register</h2>
                  {error && <Alert variant='danger' style={{ fontSize: "15px" }}>{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" className='register-btn mt-2 fw-semibold' style={{ fontSize: "19px" }}>Register</Button>

                    <div className='mt-2 text-center'>
                      <span>Don’t have an account? </span>
                      <Link to="/login" className="login-link">Login</Link>
                    </div>
                  </Form>
                </Card.Body>
              </Col>

              {/* Right Panel */}
              <Col xs={12} md={6} className='image-section'>
              </Col>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
