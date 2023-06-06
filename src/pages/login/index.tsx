import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from '../Provider/user/index';
import { IUser } from '../Provider/user/context';
import styles from '../login/styles.module.css';
import { useRouter } from 'next/router';
import { useCartState } from '../Provider/cart';
import withHome from '../../hocs/withAuth';
import {FaUserCircle} from 'react-icons/Fa';


const Login = () => {

    const { loginUser } = useUser();
    const [userNameOrEmailAddress, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {push} = useRouter();
    const {cartItems}=useCartState()
   
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        loginUser(values as IUser)
          {cartItems?.length?push('/cart'): push('/')}
    };

    return (
        <>
        <div className={styles.background}>
        <div className={styles.container}>
           
            <Form
                name="normal_login"
                className={styles.loginform}
                initialValues={{
                    rememberClient: true,
                }}
                onFinish={onFinish}
                
            >
                 <h1><FaUserCircle color="white" size={80} /></h1>
                 <h3>Welcome back!</h3>
                <Form.Item
                    name="userNameOrEmailAddress"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                    className={styles.input}

                >
                    <Input
                        className={styles.inputag}
                        type="text"
                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                    className={styles.input}

                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className={styles.inputag}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </Form.Item>
                <Form.Item name="rememberClient"  >
                    <Checkbox className={styles.check} >Remember me</Checkbox>
                    <a href="" className={styles.loginforgot}>
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item name={''}>
                    <Button ghost htmlType="submit"
                        className={styles.loginbutton}
                    >
                        Log in
                    </Button>
                    <br />
                    <br />
                    <div className={styles.regLink}>
                        <Link href="/register" ><a >Create Account</a></Link>
                    </div>

                </Form.Item>
            </Form>
        </div>
        </div>
        </>
    );
}

export default withHome(Login);