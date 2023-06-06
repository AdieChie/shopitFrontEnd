import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import React from 'react';
import Payment from '../../pages/payment';
import Shipping from '../../pages/shipping';

const { Step } = Steps;
const steps = [
    {
      title: 'First',
      content:<Shipping/>,
    },
    {
      title: 'Second',
      content: <Payment/>,
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

const Stepper: React.FC = () => (
  <Steps >
    <Step status="finish" title="Login" icon={<UserOutlined />} />
    <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
    <Step status="process" title="Pay" icon={<LoadingOutlined />} />
    <Step status="wait" title="Done" icon={<SmileOutlined />} />
  </Steps>
);

export default Stepper;