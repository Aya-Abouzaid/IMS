import React, { useState, useEffect } from 'react';
import { Button, Tabs, Table, Empty, message, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';

const { TabPane } = Tabs;

interface Task {
  key: string;
  name: string;
  dueDate: string;
}

const columns = [
  {
    title: 'Task Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: Task) => <a onClick={() => handleDelete(record.key)}>Delete</a>,
  },
];

const Tasks: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks'); // Your backend API route
      const tasks = response.data.map((task: any) => ({
        key: task._id,  // Assuming tasks have an _id
        name: task.name,
        dueDate: task.dueDate,
      }));
      setData(tasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks', error);
      message.error('Failed to load tasks');
      setLoading(false);
    }
  };

  // Handle form submission
  const handleCreate = async (values: { name: string; dueDate: any }) => {
    try {
      await axios.post('/api/tasks', {
        name: values.name,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
      });
      message.success('Task created successfully');
      setIsModalVisible(false);
      form.resetFields(); // Reset form fields
      fetchTasks(); // Refetch tasks after creation
    } catch (error) {
      console.error('Error creating task', error);
      message.error('Failed to create task');
    }
  };

  // Delete a task
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      message.success('Task deleted successfully');
      fetchTasks(); // Refetch tasks after deletion
    } catch (error) {
      console.error('Error deleting task', error);
      message.error('Failed to delete task');
    }
  };

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
      <h1>Tasks</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
          {loading ? (
            <p>Loading...</p>
          ) : data.length ? (
            <Table columns={columns} dataSource={data} pagination={false} />
          ) : (
            <Empty description="No tasks" />
          )}
        </TabPane>
        <TabPane tab="Archived" key="2">
          <Empty description="No tasks" />
        </TabPane>
      </Tabs>
      <Button type="primary" style={{ marginTop: '16px' }} onClick={showModal}>
        Create Task
      </Button>

      {/* Modal for creating task */}
      <Modal
        title="Create Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            label="Task Name"
            name="name"
            rules={[{ required: true, message: 'Please input the task name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
           
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
function handleDelete(key: string): void {
  throw new Error('Function not implemented.');
}

