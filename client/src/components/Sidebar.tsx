import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BookOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../style/Sidebar.scss'; // Import the CSS file for custom styles

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider
      width={200}
      style={{ backgroundColor: '#ffffff' }}
      className="custom-sidebar"
    >
      {/* Logo Section */}
      <div className="logo1-section">
        <Link to="/">
          <img src="/logo-corelia-forme.svg" alt="Corelia RICOH" style={{ width: '70%', maxWidth: '120px' }} />
        </Link>
      </div>

      <div className="logo2-section">
        <Link to="/">
          <img src="/image.png" alt="Corelia RICOH" style={{ width: '100%', maxWidth: '150px' }} />
        </Link>
      </div>

      {/* Menu Section */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0, backgroundColor: '#ffffff' }}
        className="custom-menu"
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/Users">Users</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="/programs">Programs</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<OrderedListOutlined />}>
          <Link to="/tasks">Tasks</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
