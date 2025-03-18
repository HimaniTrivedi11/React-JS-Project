import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('token');
    
    // Redirect to login page or home page
    alert('You have been logged out!');
    navigate('/');  
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
