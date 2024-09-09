import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Row,
  Col,
  List,
  Popconfirm,
  Tabs,
  Typography,
  Modal,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  LockOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

interface User {
  username: string;
  email: string;
  password: string;
  role: 'Team Leader' | 'Trainee';
}

interface Props {
  currentUserRole: 'Admin' | 'Team Leader';
}

function UserManagement({ currentUserRole }: Props) {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<User[]>([]); // State to manage users
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: User) => {
    if (editingUser) {
      // If editing an existing user, update their information
      setUsers((prevUsers) => prevUsers.map(
        (user) => (user.username === editingUser.username ? values : user),
      ));
      message.success(`User ${values.username} updated successfully!`);
    }
    else {
      // Add new user to the list
      setUsers((prevUsers) => [...prevUsers, values]);
      message.success(`User ${values.username} added successfully!`);
    }

    form.resetFields(); // Reset the form fields after submission
    setEditingUser(null); // Reset editing user state
    setIsModalVisible(false); // Close modal
  };

  const handleDelete = (username: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
    message.success(`User ${username} deleted successfully!`);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user); // Pre-fill the form with user data for editing
    setIsModalVisible(true); // Show modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null); // Reset editing user state
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={3}>User Management</Title>
        </Col>
        <Col>
          <Button type="primary" style={{ float: 'right' }} onClick={() => form.resetFields()}>
            Reset Form
          </Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Add User" key="1">
          <Row gutter={16} justify="center">
            <Col>
              <Card title="Add User" bordered={false} style={{ width: '700px' }}>
                <Form
                  form={form}
                  name="user_add_form"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input the Username!' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Username" style={{ width: '90%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the Email!' }]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" style={{ width: '90%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          { required: true, message: 'Please input the Password!' },
                          { min: 6, message: 'Password must be at least 6 characters.' },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ width: '90%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  {currentUserRole === 'Admin' && (
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                          <Select placeholder="Select Role" suffixIcon={<TeamOutlined />} style={{ width: '90%' }}>
                            <Option value="Team Leader">Team Leader</Option>
                            <Option value="Trainee">Trainee</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                  {currentUserRole === 'Team Leader' && (
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="role"
                          label="Role"
                          initialValue="Trainee" // Automatically set role to Trainee for Team Leaders
                          rules={[{ required: true, message: 'Role must be Trainee!' }]}
                        >
                          <Select disabled style={{ width: '90%' }}>
                            <Option value="Trainee">Trainee</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '50%', margin: '0 auto', display: 'block' }}>
                      {editingUser ? 'Update User' : 'Add User'}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="User List" key="2">
          <Row gutter={16} justify="center">
            <Col>
              {/* List of Users */}
              <Card title="User List" bordered={false} style={{ width: '800px' }}>
                <List
                  dataSource={users}
                  renderItem={(user) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>,
                        <Popconfirm
                          title="Are you sure you want to delete this user?"
                          onConfirm={() => handleDelete(user.username)}
                          okText="Yes"
                          cancelText="No"
                          icon={<ExclamationCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}
                          okButtonProps={{ style: { backgroundColor: 'red', color: 'white' } }} // Style for the "Yes" button
                          cancelButtonProps={{ style: { color: 'black' } }} // Optional: style for the "No" button
                          overlayStyle={{ fontSize: '18px' }} // Makes the pop-up bigger
                        >
                          <Button
                            type="link"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                            style={{ color: 'red' }}
                          >
                            Delete
                          </Button>
                        </Popconfirm>,
                      ]}
                    >
                      <List.Item.Meta
                        title={user.username}
                        description={(
                          <>
                            <div>{user.email}</div>
                            <div style={{ fontStyle: 'italic', color: '#888' }}>
                              Role:
                              {' '}
                              {user.role}
                            </div>
                          </>
                        )}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Card bordered={false} style={{ width: '100%' }}>
          <Form
            form={form}
            name="user_edit_form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please input the Username!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Username" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please input the Email!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please input the Password!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ width: '90%' }} />
                </Form.Item>
              </Col>
            </Row>
            {currentUserRole === 'Admin' && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                    <Select placeholder="Select Role" suffixIcon={<TeamOutlined />} style={{ width: '90%' }}>
                      <Option value="Team Leader">Team Leader</Option>
                      <Option value="Trainee">Trainee</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
            {currentUserRole === 'Team Leader' && (
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="role"
                    label="Role"
                    initialValue="Trainee" // Automatically set role to Trainee for Team Leaders
                    rules={[{ required: true, message: 'Role must be Trainee!' }]}
                  >
                    <Select disabled style={{ width: '90%' }}>
                      <Option value="Trainee">Trainee</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Update User
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}

export default UserManagement;
