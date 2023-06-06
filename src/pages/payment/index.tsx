import style from '../payment/styles.module.css';
import { Card, Button, Tabs, message, Col, Divider, Row, Image } from 'antd';
import React, { useContext, useLayoutEffect, useState } from 'react';
import LayoutMain from '../../components/Layouts/main/layout';
import CardPayment from './card';
import EFT from './eft';
import { IPayment } from '../Provider/payment/context';
import { usePayments } from '../Provider/payment';
import { IUpdateOrder, IOrder } from '../Provider/order/context';
import { useOrders } from '../Provider/order';
import Router, { useRouter } from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import withHome from '../../hocs/withAuth';
import { CartContext } from '../Provider/cart/context';
import { SiContactlesspayment } from 'react-icons/Si'
import Layout from '../../components/Layouts/payment/payLayout';
import { RiSecurePaymentLine } from 'react-icons/Ri'
import { TbTruckDelivery } from 'react-icons/Tb'
import { BsArrowRepeat } from 'react-icons/Bs'



const { TabPane } = Tabs;


const App: React.FC = () => {

    const [subtotal, setSubtotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);
    const [method, setMethod] = useState(1);
    const { createPayment } = usePayments();
    const { updateOrder, deleteOrder } = useOrders();
    const { push } = useRouter();
    const { cartItems } = useContext(CartContext);


    useLayoutEffect(() => {
        setSubtotal(JSON.parse(localStorage.getItem('totalAmount')!));
        setVat(subtotal * 0.15);
        setShipping(subtotal * 0.002);
        setOrderTotal(Math.round((JSON.parse(localStorage.getItem('totalAmount')!) + (subtotal * 0.15) + (subtotal * 0.002)) * 100) / 100);
    }, [subtotal])

    const handleCreate = () => {
        const payload: IPayment = {
            orderId: JSON.parse(localStorage.getItem("order")!).id,
            method: method,
            amount: orderTotal,
        }
        createPayment(payload);
        cartItems.length === 0;
        setTimeout(() => {
            Router.push('/');
        }, 1000)

        const Upload: IUpdateOrder = {
            id: JSON.parse(localStorage.getItem("order")!).id,
            status: 'paid',
        }

        updateOrder(Upload);
    }

    const handleDeleteOrder = () => {

        let orderId = JSON.parse(localStorage.getItem("order")!).id
        deleteOrder(orderId);
        setTimeout(() => {
            push('/');
        }, 1000)

    }
    const onChange = (key: string) => {
        console.log(key);
        setMethod(parseInt(key));
    };

    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure you want to cancel this order?',
            icon: <ExclamationCircleOutlined />,
            content: 'This order will be cancelled immediately and you can,t do any changes after',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDeleteOrder()
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <>
            <Layout>
                <h2 style={{ color: 'black', marginTop: '5vw', marginLeft: '5vw' }} >Payment</h2>
                <div className={style.container}>
                    <Tabs defaultActiveKey="1" onChange={onChange} style={{ width: '80%', marginTop: '2vw', height: '25vw' }}>
                        <TabPane tab="Debit/Credit Card" key="1">
                            <>
                                <CardPayment /></>
                        </TabPane>
                        <TabPane tab="EFT" key="2">
                            <EFT />
                        </TabPane>
                    </Tabs>
                    <Card style={{ marginLeft: '-8vw', height: '25vw', marginTop: '4vw', width: '35vw', boxShadow: '1px 5px 10px 1px grey' }} >
                        <div  >
                            <h2 style={{ borderBottom: '1px solid lightgray', fontWeight: 'bold' }}>Order Summary</h2>
                            <div className={style.summary} >
                                <div  >
                                    <span className={style.title}>Subtotal</span>
                                    <span className={style.amount}>R {subtotal}</span>
                                </div>
                                <div>
                                    <span className={style.title}>Shipping</span>
                                    <span className={style.amount}>R {Math.round(shipping * 100) / 100}</span>
                                </div>
                                <div  >
                                    <span className={style.title}>VAT</span>
                                    <span className={style.amount}>R {Math.round(vat * 100) / 100}</span>
                                </div>
                                <div className={style.total}>
                                    <span >Order Total</span>
                                    <span className={style.amount} >R {orderTotal}</span>
                                </div>

                                <div >
                                    <Button style={{ backgroundColor: 'black' }} className={style.buttons} type='primary' onClick={() => handleCreate()}>Pay</Button>
                                    <Button className={style.buttons} danger onClick={showDeleteConfirm} >Cancel</Button>
                                </div>

                            </div>
                        </div>
                    </Card>
                </div>
                <div className={style.cont} >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className={style.col}>
                                <RiSecurePaymentLine size={45} />
                                <p>Secure Card Payment</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={style.col}>
                                <SiContactlesspayment size={45} />
                                <p>Safe & Easy Eft payment </p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={style.col}>
                                <TbTruckDelivery size={45} />
                                <p>Fast & Safe Delivery</p>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className={style.col}>
                                <BsArrowRepeat size={45} />
                                <p>Trade in online</p>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Layout>
        </>
    );
};

export default withHome(App);