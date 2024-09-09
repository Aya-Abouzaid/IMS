import React, { useState } from 'react';
import {
  Form, Input, Button, Checkbox, Modal,
} from 'antd';
import {
  UserOutlined, LockOutlined, CheckCircleOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import '../style/style.scss';

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

function Login() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    icon: React.ReactNode;
  }>({
    title: '',
    message: '',
    icon: null,
  });

  const navigate = useNavigate();

  const showModal = (title: string, message: string, icon: React.ReactNode) => {
    setModalContent({ title, message, icon });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (modalContent.title === 'Login Successful') {
      navigate('/Users'); // Navigate to the user page after successful login
    }
  };

  const onFinish = (values: LoginFormValues) => {
    console.log('Received values of form: ', values);

    // Simulate authentication API call
    if (values.email === 'admin' && values.password === 'admin') {
      showModal(
        'Login Successful',
        'You have successfully logged in.',
        <CheckCircleOutlined style={{ color: 'green' }} />,
      );
    }
    else {
      showModal(
        'Login Failed',
        'Invalid username or password.',
        <ExclamationCircleOutlined style={{ color: 'red' }} />,
      );
    }
  };

  return (
    <div className="login-container">
      <Breadcrumb items={
        [{ title: 'Home', path: '/' },
          { title: 'Login', path: '/login' }]
      }
      />
      <div
        className="logo-container"
        style={{
          textAlign: 'center', margin: '10px 0', paddingTop: '10em',
        }}
      >
        <img src="/favicon.png" alt="CORELIA.ai Logo" style={{ maxWidth: '100px' }} />
        <h1 className="login-heading">IMS </h1>
      </div>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="login-form"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className="icon" />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="icon" />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="#" className="forgot-link">Forgot password?</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button">
            Log in
          </Button>
          Or
          {' '}
          <br />
          <a href="#" className="sign-up">Sign Up</a>
        </Form.Item>
      </Form>

      <Modal
        title={(
          <span>
            {modalContent.icon}
            {' '}
            {modalContent.title}
          </span>
        )}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>{modalContent.message}</p>
      </Modal>
    </div>
  );
}

export default Login;
