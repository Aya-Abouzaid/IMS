import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Tabs,
  Empty,
  Card,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  LockOutlined,
} from '@ant-design/icons';
import '../style/Useredit.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Option } = Select;
const { TabPane } = Tabs;

interface User {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Team Leader' | 'Trainee';
}

function UserEdit() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState<User | null>(null);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser: User = {
        id: '1',
        username: 'johndoe',
        email: 'johndoe@example.com',
        role: 'Team Leader',
      };
      setUser(fetchedUser);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const showModal = (values: User) => {
    setFormValues(values);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      // Simulate an API call to update user data
      console.log('Updated User Info: ', formValues);
      message.success({
        content: 'User information updated successfully!',
        style: { fontSize: '18px', textAlign: 'center' }, // Adjust font size and alignment
      });
      setIsModalVisible(false);
    }
    catch (error) {
      message.error('Failed to update user information. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: User & { password?: string }) => {
    showModal(values);
  };

  const handleTabChange = (key: string) => {
    if (key === '2') { // Navigate to User Management when the User Management tab is selected
      navigate('/user-management'); // Change to your User Management route
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      <Card title="Edit User Information" bordered={false} style={{ width: '800px', margin: '0 auto' }}>
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Edit Info" key="1">
            {user ? (
              <Form
                name="user_edit_form"
                initialValues={user}
                onFinish={onFinish}
                layout="vertical"
                className="user-edit-form"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      label="Username"
                    >
                      <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                    >
                      <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="password"
                      label="Password"
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="role"
                  label="Role"
                >
                  <Select placeholder="Select Role" suffixIcon={<TeamOutlined />}>
                    <Option value="Admin">Admin</Option>
                    <Option value="Team Leader">Team Leader</Option>
                    <Option value="Trainee">Trainee</Option>
                  </Select>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit" style={{ width: '80%', padding: '5px 15px' }}>
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Empty description="No user data available" />
            )}
          </TabPane>
          <TabPane tab="User Management" key="2">
            {' '}
            {/* User Management Tab */}
            <Empty description="Manage your users here" />
          </TabPane>
          <TabPane tab="Archived Users" key="3">
            {' '}
            {/* Archived Users Tab */}
            <Empty description="Manage archived users here" />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Confirm Changes"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        width={600}
      >
        <p>Are you sure you want to save the changes?</p>
        <p>
          <strong>Username:</strong>
          {' '}
          {formValues?.username}
        </p>
        <p>
          <strong>Email:</strong>
          {' '}
          {formValues?.email}
        </p>
        <p>
          <strong>Role:</strong>
          {' '}
          {formValues?.role}
        </p>
      </Modal>
    </div>
  );
}

export default UserEdit;
