import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logged out');
        // Perform any additional actions upon successful logout
        navigate('/'); // Navigate to the login page
      } else {
        console.log('Logout failed');
        // Handle the failed logout scenario
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
      // Handle any error that occurred during the logout process
    }
  };

  useEffect(() => {
    handleLogout();
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default Logout;
