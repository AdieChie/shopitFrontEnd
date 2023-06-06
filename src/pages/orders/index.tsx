
import { Table, Modal, Space } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styles from '../orders/styles.module.css';
import { useOrders } from '../Provider/order';
import { FaEdit } from 'react-icons/Fa';
import { MdOutlineDelete } from 'react-icons/Md';
import { useRouter } from 'next/router';
import withHome from '../../hocs/withAuth';

interface DataType {
  key?: string;
  orderNumber?: string;
  status?: string;
  id?: string;
}

type Props = {
  data: DataType[]
}

const MyAccount: React.FC<Props> = ({ data }) => {
  const [orderDetails, setOrderDetails] = useState({} as DataType);
  const [order, setOrder] = useState({} as DataType);
  const { getOrderItems, orderItems } = useOrders();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteOrder } = useOrders();
  const { push } = useRouter();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  

  useEffect(() => {
      let orderId = order.id;
      deleteOrder(orderId);
      push('/dashboard') 
  },[order])

  const columns: ColumnsType<DataType> = [
    {
      title: 'OrderNumber',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: '30%',
      onCell: (record) => {
        return {
          onClick: (ev) => {
            showModal();
            setOrderDetails(record);
            console.log(record)
            getOrderItems(record.id);
          },
        };
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      onCell: (record) => {
        return {
          onClick: (ev) => {
            showModal();
            setOrderDetails(record);
            console.log(record)
            getOrderItems(record.id);
          },
        };
      },
    },
    {
      title: 'Date',
      dataIndex: 'orderCreationDate',
      key: 'creationTime',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a><FaEdit color="black" fontSize="1.5em"/ ></a> */}
          <a>< MdOutlineDelete color="black" fontSize="1.5em" /></a>
        </Space>
      ),
      onCell: (record) => {
        return {
          onClick: (ev) => {
            setOrder(record);
            
              
   
          },
        };
      }

    },
  ];

  return (
    <>
      <Modal title={order.orderNumber} visible={isModalVisible} onOk={handleCancel}
        okButtonProps={{ style: { background: 'black' } }}
        okText={'Close'}
        cancelButtonProps={{ style: { display: 'none' } }}
        className={styles.modal} >

        <div className={styles.titles} >
          <h3 className={styles.productTitle} >Product</h3>
          <h3 className={styles.quantity} >Quantity</h3>
          <h3 className={styles.total} >Price</h3>
        </div>
        {orderItems?.map(item => {
          return (
            <>
              <div className={styles.item}>
                <p>{item.name}</p>
                <p>{item.quantity}</p>
                <p>{item.amount}</p>
              </div>
            </>
          )
        })}
      </Modal>
      <h2 className={styles.h2}> Order History</h2>
      <Table columns={columns} dataSource={data} className={styles.table} style={{ backgroundColor: 'black' }} pagination={{
        pageSize: 5,
        total: 10
      }}/>
    </>
  );
};

export default withHome(MyAccount);