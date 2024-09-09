import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Tasks from './pages/tasks';
import Users from './pages/Users';
import UserManagement from './pages/UserManagement';

const { Sider, Content } = Layout;

// Layout for pages that need it
function AppLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Sidebar />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', padding: '24px' }}>
          <Routes>
            {/* Define all the routes that need the layout */}
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user-management" element={<UserManagement currentUserRole="Team Leader" />} />

          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* The Login route without any layout */}
        <Route path="/login" element={<Login />} />

        {/* All other routes with the layout */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
