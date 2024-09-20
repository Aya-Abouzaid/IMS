import React from 'react';
import { Button, Tabs, Table, Empty } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

interface Program {
  key: string;
  title: string;
  description: string;
}

const columns = [
  {
    title: 'Program Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: Program) => (
      <Button type="link">
        <Link to={`/programs/${record.key}/tasks`}>View Tasks</Link>
      </Button>
    ),
  },
];

const data: Program[] = [
  { key: '1', title: 'Program 1', description: 'Description 1' },
  { key: '2', title: 'Program 2', description: 'Description 2' },
  { key: '3', title: 'Program 3', description: 'Description 3' },
];

const Programs: React.FC = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
      <h1>Programs</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active" key="1">
          {data.length ? <Table columns={columns} dataSource={data} pagination={false} /> : <Empty description="No data" />}
        </TabPane>
        <TabPane tab="Archived" key="2">
          <Empty description="No data" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Programs;
 