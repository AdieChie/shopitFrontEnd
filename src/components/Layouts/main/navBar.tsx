import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './layout.module.css'
import BadgeIcon from './badge';
import Router from 'next/router';
import { Input, Menu, Dropdown, Space, Radio,Image } from 'antd';
import { useProducts } from '../../../pages/Provider/Products';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { AiOutlineApple } from "react-icons/Ai";
import { SiSamsung, SiXiaomi, SiNokia, SiHuawei, SiGoogle } from "react-icons/Si";
import { CartContext } from '../../../pages/Provider/cart/context';
import { useUser } from '../../../pages/Provider/user';
import { useOrders } from '../../../pages/Provider/order';
import type { RadioChangeEvent } from 'antd';

interface Iprops {
    isdefault: boolean;
}

const NavBar = ({ isdefault }: Iprops) => {
    const { searchProducts, getProducts, getCategories, getBrands, getFiltered, isDefault } = useProducts();
    const { getOrdersByCustomerId } = useOrders();
    const [term, setTerm] = useState<string>('');
    const [word, setWord] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const searchTerm = useDebounce(term, 1000);
    const { currentUser } = useUser();

    const onSearch = (value: string) => {
        searchProducts(value);

    };

    useEffect(() => {
        if (searchTerm !== '') {
            searchProducts(term);
        }else{
            getProducts();
        }
    }, [searchTerm])

    const checkLogin = () => {
        if (currentUser === undefined) {
            Router.push('/login')
        }
        else {
            getOrdersByCustomerId(currentUser.id);
            Router.push('/dashboard')
        }
    }


    // useEffect(() => {

    // }, [word])

    const menu = (
        <Menu
            className={styles.menu}
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={() => setBrand('Apple')} >
                            < AiOutlineApple />

                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a onClick={() => setBrand("Samsung")}>
                            <SiSamsung />

                        </a>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a onClick={() => setBrand("Huawei")}>
                            <SiHuawei />
                        </a>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <a onClick={() => setBrand("xiaomi")}>
                            <SiXiaomi />
                        </a>
                    ),
                },
                {
                    key: '5',
                    label: (
                        <a onClick={() => setBrand("Google")}>
                            < SiGoogle />
                        </a>
                    ),
                },
                {
                    key: '6',
                    label: (
                        <a onClick={() => setBrand("Nokia")}>
                            < SiNokia />
                        </a>
                    ),
                },
            ]}
        />
    );
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const filter = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (<>

                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                <Radio value={1} onClick={() => getFiltered(word || brand, 1, 999)}>R1 - R999</Radio>
                                <Radio value={2} onClick={() => getFiltered(word || brand, 1000, 4999)}>R1 000 - R 4 999</Radio>
                                <Radio value={3} onClick={() => getFiltered(word || brand, 5000, 9999)}> R 5 000 - R 9 999</Radio>
                                <Radio value={4} onClick={() => getFiltered(word || brand, 10000, 20000)}>R 10 000 - R 20 000</Radio>
                                <Radio value={5} onClick={() => getFiltered(word || brand, 21000, 30000)}>R 21 000 - R 30 000 </Radio>
                                <Radio value={6} onClick={() => getFiltered(word || brand, 30000, 50000)}> R 30 000+ </Radio>
                            </Space>
                        </Radio.Group>

                    </>

                    ),
                }
            ]}
        />
    );

    useEffect(() => {
        if(word){
            getCategories(word)
        }
        
    }, [word])

    useEffect(() => {
        if(brand){
            getBrands(brand)
        }
        
    }, [brand])
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                
               
                 <a href="/"><Image src ={'./log.png'} height='3' width='3'  className={styles.logoImg} preview={false} alt=''/></a>
            </div>
            <div className={styles.category}>
                <>
                    <a onClick={() => setWord("phones")}>Phones</a>
                    <a onClick={() => setWord("tablets")}>Tablets</a>
                    <a onClick={() => setWord("watches")}>Watches</a>
                    <a onClick={() => setWord("accessories")}>Accessories</a>
                    <Dropdown overlay={menu} placement="bottom" >
                        <a>Brands</a>
                    </Dropdown>
                    {!isDefault && <Dropdown overlay={filter} placement="bottom" >
                        <a>Shop by Price</a>
                    </Dropdown>
                    }


                </>
            </div>

            <Input placeholder="input search text"
                onChange={value => {

                    setTerm(value.target.value)


                }
                } style={{ width: 300, backgroundColor: 'transparent', color: 'white' }}
            />

            <a onClick={() => checkLogin()}><UserOutlined /></a>
            <Link href='/cart'><a><><ShoppingCartOutlined /><BadgeIcon /></></a></Link>

        </nav>
    );
}

export default NavBar;