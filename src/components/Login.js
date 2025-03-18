import React, { useState } from 'react';
import { Container, Row, Col, Form, Button,  Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo white.png';
import './Login.css';
import axios from 'axios';

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate form data (if needed)
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password
      });

      if (response.data && response.data.token) {
        // Store JWT token and user's email in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", formData.email);  // store email

        console.log("Login successful, redirecting...");
        navigate("/");

      } else {
        setErrorMessage(response.data.message || "Invalid email or password.");
      }

    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Invalid email or password.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="logo-container">
        <a href="/">
          <img src={Logo} alt="Brand Logo" className="logo-img" />
        </a>
      </div>

      <Container fluid className='login-container d-flex justify-content-center align-items-center vh-100'>
        <Row className='row-container'>
          {/* Left Side Logo */}

          <Card className='login-card' style={{ borderRadius: "25px" }}>
            <Row className='g-0'>
              {/* Left Side Login Form */}
              <Col xs={12} md={6} className='form-section'>
                <Card.Body className='w-100'>
                  <h2 className='mb-3 fw-semibold text-center'>Login</h2>

                  {error && <Alert variant='danger'>{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter Email Address'
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Enter Your Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className='login-btn mt-2 fw-semibold' style={{ fontSize: "19px" }}>Login</Button>

                    <div className='mt-3 text-center'>
                      <span>Don’t have an account? </span>
                      <Link to="/register" className="register-link">Register</Link>
                    </div>
                  </Form>
                </Card.Body>
              </Col>
              {/* Right Side Image */}
              <Col xs={12} md={6} className='image-section'>
              </Col>
            </Row>
          </Card>
        </Row>
      </Container> 
    </div>
  );
};

export default Login;