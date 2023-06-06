import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import LayoutTwo from '../../components/Layouts/myAccount/layoutTwo';
import styles from '../dashboard/styles.module.css'
import MyAccount from '../orders';
import { useOrders } from '../Provider/order';
import {SiShopify} from 'react-icons/Si';
import {MdOutlinePaid} from 'react-icons/Md';
import {GiSandsOfTime} from 'react-icons/Gi'
import withHome from '../../hocs/withAuth';
import { useUser } from '../Provider/user';


const Dashboard: React.FC = () => {
  const { getOrdersByCustomerId, orders } = useOrders();
  const [pending, setPending] = useState([]);
  const [paid, setPaid] = useState([]);
  const {currentUser} = useUser();


  useEffect(() => {
    if (orders !== undefined) {
      setPending(orders?.filter(order => order.status?.toLowerCase() === "pending" ));
      setPaid(orders?.filter(order => order.status?.toLowerCase() === "paid" ));
     // console.log(filtered);
    } else {
      getOrdersByCustomerId(currentUser.id);
     
    }
  }, [orders])


  return (
    <LayoutTwo>
      <div className={styles.cardWrapper}>
        <Row gutter={16}>
          <Col span={8}>
            <Card  bordered={true} className={styles.card}>
            <SiShopify/>
              <h1>Total Orders</h1>

              {orders?.length}
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} className={styles.card}>
              <MdOutlinePaid/>
            <h1>Orders Paid</h1>
              {paid?.length}
            </Card>
          </Col>
          <Col span={8}>
            <Card  bordered={true} className={styles.card}>
            <GiSandsOfTime/>
            <h1> Orders Pending</h1>
              {pending?.length}
            </Card>
          </Col>
        </Row>
      </div>
      <MyAccount data={orders} />
    </LayoutTwo>
  );
}
export default withHome(Dashboard);