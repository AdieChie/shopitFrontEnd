import { Button, Form, Input, Select, Image, message, Card } from 'antd';
import Router from 'next/router';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Layout from '../../components/Layouts/payment/payLayout';
import { useShipping } from '../Provider/shipping';
import { useRouter } from 'next/router';
import style from '../payment/styles.module.css';
import { CartContext } from '../Provider/cart/context';
import withHome from '../../hocs/withAuth';
import { TbTruckDelivery } from 'react-icons/Tb';
import { MdOutlinePayment } from 'react-icons/Md';
import { useUser } from '../Provider/user';



const { Option } = Select;


const Shipping: React.FC = () => {
  const { shippingOrder } = useShipping();
  const [value, setValue] = useState('');
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { push } = useRouter();
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useUser();

  const onFinish = (values: any) => {
    const orderid = JSON.parse(localStorage.getItem("order")!).id
    // console.log("orderid", orderid);
    // console.log('Received values of form: ', values);
    shippingOrder({ ...values, OrderId: orderid });
   openMessage();
    Router.push('/payment')
  };


  useEffect(() => {
    if (currentUser === undefined) {
      router.push('/login?redirect=/shipping');
    }
  }, [currentUser]);

  const key = 'updatable';

  const openMessage = () => {
    message.loading({ content: 'Saving...', key });
    setTimeout(() => {
      message.success({ content: 'Saved!', key, duration: 2 });
    }, 1000);
  };

  return (
    <>
      <Layout>

        <h2 style={{ color: 'black', marginTop: '5vw', marginLeft: '5vw' }} >Add Shipping Address</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
          <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ marginTop: '2vw' }}  >

            <Form.Item
              name="FirstName"
              rules={[{ required: true, message: 'Please input your Name!' }]}
              style={{ display: 'inline-block', width: 'calc(30% - 8px)', marginLeft: '5vw' }}
            >
              <Input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </Form.Item>
            <Form.Item
              name="Surname"
              rules={[{ required: true, message: 'Please input your Surname!' }]}
              style={{ display: 'inline-block', width: 'calc(30% - 8px)', marginLeft: '2vw' }}
            >
              <Input
                placeholder="Surname" onChange={(e) => setSurname(e.target.value)} value={surname}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"

              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },

              ]}
              style={{ display: 'inline-block', width: '73vw', marginLeft: '5vw' }}
            >
              <Input
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}

              />
            </Form.Item>
            <Form.Item
              name='Address'
              rules={[{
                required: true,
                message: 'Please enter street'
              }]}
              style={{ display: 'inline-block', width: '73vw', marginLeft: '5vw' }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Input placeholder="Street address" onChange={(e) => setAddress(e.target.value)} value={address} />
              </Form.Item>
            </Form.Item>


            <Form.Item
              name='City'
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: '73vw', marginLeft: '5vw' }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Input placeholder="City" onChange={(e) => setCity(e.target.value)} value={city} />
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ marginLeft: '5vw' }}>
              <Input.Group compact>
                <Form.Item
                  name={['province']}
                  // noStyle
                  rules={[{ required: true }]}


                >
                  <Select placeholder="Select province" value={province}>
                    <Option value="Eastern Cape">Eastern Cape</Option>
                    <Option value="Free State">Free State</Option>
                    <Option value="Gauteng">Gauteng</Option>
                    <Option value="KwaZulu-Natal">KwaZulu-Natal</Option>
                    <Option value="Limpopo">Limpopo</Option>
                    <Option value="Mpumalanga">Mpumalanga</Option>
                    <Option value="Northern Cape">Northern Cape</Option>
                    <Option value="North West">North West</Option>
                    <Option value="Western Cape">Western Cape</Option>

                  </Select>
                </Form.Item>
                <Form.Item
                  name={['ZipCode']}
                  noStyle>
                  <Form.Item
                    name='Zip Code'
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 20px' }}
                  >
                    <Input placeholder="Zip Code" onChange={(e) => setZipCode(e.target.value)} value={zipCode} />
                  </Form.Item>
                </Form.Item>

              </Input.Group>

            </Form.Item>


            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '-27vw', width: '49vw', backgroundColor: 'black' }}   >
                Save
              </Button>

            </Form.Item>
          </Form>

          <div style={{ display: 'grid', gridRow: '1fr 1fr' }} >
            <Card title='Your Cart' style={{ marginLeft: '-37vw', marginTop: '2vw', width: '35vw', overflowY: 'auto', maxHeight: '25vw', boxShadow: '1px 2px 10px 3px grey' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem', borderBottom: '1px solid lightgrey' }}  >
                <h3  >Product</h3>
                <h3 >Quantity</h3>
                <h3 >Price</h3>
              </div >
              {cartItems?.map(item => {
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '1rem' }}>
                      <p>{item.name}</p>
                      <p>{item.quantity}</p>
                      <p>R {item.price}</p>
                    </div>
                  </>
                )
              })}

              <div>
                <Button type='primary' style={{ width: '100%', backgroundColor: 'black' }} onClick={() => (push('/cart'))}>Edit cart</Button>
              </div>

            </Card>
          </div>
          <Card bordered={true} style={{ fontSize: '60px', color: 'white', marginLeft: '3vw' }}>
            {/* <TbTruckDelivery style={{fontSize: '60px' , color:'white'} }/>  */}
            <Image src='./cute.jpg' width={'70rem'} height={'20rem'} style={{ marginBottom: '4vw', marginLeft: '2vw', boxShadow: '1px 2px 5px 2px grey' }} alt='' preview={false} />
            {/* <MdOutlinePayment/> */}
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default withHome(Shipping);