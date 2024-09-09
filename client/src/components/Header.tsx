import React from 'react';
import {
  Layout, Typography, Button,
} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/Header.scss';

const { Header } = Layout;
const { Title } = Typography;

function AppHeader() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or user state

    // Navigate to the login page
    navigate('/login'); // Adjust the path to your login page route
  };

  return (
    <Header className="site-layout-background header">
      <div className="logo">
        <img src="/logo-corelia-forme.svg" alt="Corelia Logo" className="logo-img" />
        <Title level={3} className="header-title">IMS</Title>
      </div>

      <div className="header-actions">
        <Button icon={<LogoutOutlined />} className="header-button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
}

export default AppHeader;
