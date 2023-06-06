import React, { useState, useEffect, useContext } from "react";
import { useMain } from "./Provider/cart";
import { Image, Button, Modal } from 'antd';
import styles from '../styles/Home.module.css';
import Layout from "../components/Layouts/main/layout";
import { IProduct } from "./Provider/Products/context";
import { CartContext } from "./Provider/cart/context";
import Carousels from "../components/Layouts/main/carousel";
import { useProducts } from "./Provider/Products";
import { useUser } from "./Provider/user";
import { Card } from 'antd';
import { TbTruckDelivery } from 'react-icons/Tb';
import { GrMapLocation, GrCart } from 'react-icons/Gr';
import { BsQuestionLg, BsCreditCard } from 'react-icons/Bs';
import { Pagination, Select } from 'antd';

const { Option } = Select;
interface Iprops {
    isdefault: boolean;

}
export const Home = ({ isdefault}: Iprops) => {

    const { addToCart, removeFromCart } = useMain();
    const { currentUser } = useUser();
    const { cartItems } = useContext(CartContext);
    const { getProducts, products, isDefault } = useProducts();
    const [details, setDetails] = useState({} as IProduct)
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if(products === undefined){
            getProducts();
        }
       
    }, [])

    const handleAdd = (product: IProduct) => {
        addToCart({ ...product });


    };
    const handleDetails = (product: IProduct) => {
        setDetails(product);

        showModal();
    }

    const handleChange = (value: string) => {
        if (value === "Low to High") {
            products.sort((a, b) => {
                return (
                    a.price - b.price
                )
            })
            console.log(products)
        } else if (value === "High to Low") {
            products.sort((a, b) => {
                return (
                    b.price - a.price
                )
            }
            )
            console.log(products)
        }
    };

    useEffect(() => { 

    }, [])

    return (
        <Layout>
            <div className={styles.main}>
                {isDefault && <Carousels /> || !isDefault &&
                    <div className={styles.sort}>
                        <Select placeholder="Sort by price:" className={styles.sorter} onChange={handleChange}>
                            <Option value="Low to High">Low to High</Option>
                            <Option value="High to Low">High to Low</Option>
                        </Select>
                    </div>}
                <Modal title={details.name?.toUpperCase()} visible={isModalVisible} onOk={handleCancel}
                    okButtonProps={{ style: { background: 'none', color: 'black' } }}
                    okText={'Close'}
                    cancelButtonProps={{ style: { display: 'none' } }}

                >
                    <div className={styles.modal} >
                        <div className={styles.propic}>
                            <Image src={details.image} alt="" className={styles.image} width={120} height={100} preview={false} />
                        </div>

                        <div className={styles.description}>
                            {details.decsription}
                        </div>
                    </div>
                </Modal>

                <div className={styles.productsContainer} >

                    {products?.map((product) => {

                        return (
                            <>
                                <div title={product.name} key={product.id} className={styles.homecard}  >
                                    <div className={styles.pic} onClick={() => handleDetails(product)}>
                                        <Image src={product.image} alt="" className={styles.image} width={110} height={150} preview={false} />
                                    </div>
                                    <div className={styles.cardinfo}>
                                        <h3>{product.name}</h3>
                                        <h5>Price: R {product.price}</h5>

                                        {cartItems.some((p) => p.id === product.id) ? (
                                            <Button
                                                danger
                                                onClick={() =>
                                                    removeFromCart(product)
                                                }
                                            >
                                                Remove from Cart
                                            </Button>
                                        ) : (
                                            <Button className={styles.addbtn}
                                                onClick={() =>
                                                    handleAdd(product)
                                                }>
                                                Add To Cart
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
                
            </div>
            {/* <Pagination defaultCurrent={1} total={20} pageSize={5} /> */}
        </Layout>
    );
}



export default Home;