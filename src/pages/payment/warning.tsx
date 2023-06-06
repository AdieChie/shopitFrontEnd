import { Alert, Button, Space } from 'antd';
import React from 'react';

const warn: React.FC = () => (
  <>
    <Alert
      message="Warning"
      description="Are you sure you want to delete this order?"
      type="warning"
      action={
        <Space direction="vertical">
          <Button size="small" type="primary">
            Yes
          </Button>
          <Button size="small" danger type="ghost">
            No
          </Button>
        </Space>
      }
      closable
    />
  </>
);

export default warn;