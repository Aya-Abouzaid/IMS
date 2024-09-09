import React from 'react';
import {
  Button, Tabs, Table, Empty,
} from 'antd';

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
    render: () => <a>Delete</a>,
  },
];

const data: Task[] = [
  { key: '1', name: 'Task 1', dueDate: '2024-09-15' },
  { key: '2', name: 'Task 2', dueDate: '2024-09-20' },
  { key: '3', name: 'Task 3', dueDate: '2024-09-25' },
];

function Tasks() {
  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
      <h1>Tasks</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
          {data.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <Empty description="No tasks" />}
        </TabPane>
        <TabPane tab="Archived" key="2">
          <Empty description="No tasks" />
        </TabPane>
      </Tabs>
      <Button type="primary" style={{ marginTop: '16px' }}>
        Create Task
      </Button>
    </div>
  );
}

export default Tasks;
