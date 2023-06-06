import { useContext, useEffect, useState } from "react";
import CartItem from "../cartItem";
import Link from "next/link";
import { CartContext, IProduct } from "../Provider/cart/context";
import styles from "./styles.module.css";
import LayoutMain from "../../components/Layouts/main/layout";
import { useMain } from "../Provider/cart";
import Router, { useRouter } from "next/router";
import { IOrder, IOrderItems } from "../Provider/order/context";
import { useOrders } from "../Provider/order";
import withHome from "../../hocs/withAuth";
import { Modal, Image } from 'antd';
import { useUser } from "../Provider/user";
import { IUser } from "../Provider/user/context";

const Cart = () => {

    const { cartItems } = useContext(CartContext);
    const { clearCart } = useMain();
    const { createOrder } = useOrders();
    const { currentUser } = useUser();
    const { push } = useRouter();

    const [totalAmount, setTotalAmount] = useState(0)

    const handleClear = () => {
        clearCart()
    }



    useEffect(() => {
        setTotalAmount(cartItems?.reduce((price, item) => (item.price ? item.price * item?.quantity : price) + price, 0)),
            localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
    }, [cartItems, totalAmount])

    const checkLogin = () => {
        if (currentUser === undefined) {
            push('/login')
        }
        else {
            handleOrder(currentUser);

            push('/shipping')
        }
    }

    const handleOrder = (currentUser: IUser) => {
        console.log('curry', currentUser)
        const payload: IOrder = {
            customerId: currentUser.id
            , items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, amount: item.price } as IOrderItems)),
            status: 'pending'
        };
        createOrder(payload);
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <LayoutMain>
                <div className={styles.container}>

                    {cartItems?.length === 0 ? (

                        <div className={styles.cartEmpty}>
                            {/* <p>Your cart is currently empty</p> */}

                            <Image src="/a.png" width={550} height={450} alt="" className={styles.img} preview={false} />

                            <Link href="/">
                                <button className={styles.startShopping} >Start Shopping</button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2>Shopping Cart</h2>
                            <div className={styles.titles} >
                                <h3 className={styles.productTitle} >Product</h3>
                                <h3 className={styles.price} >Price</h3>
                                <h3 className={styles.quantity} >Quantity</h3>
                                <h3 className={styles.total} >Total</h3>
                            </div>

                            <div className={styles.cartItems} >
                                {cartItems?.map((item) => (
                                    <div key={item.id} className={styles.cartItem} >
                                        <div className={styles.cartProduct}>
                                            <CartItem key={item.id} {...item} />

                                        </div>
                                    </div>))}

                                <div className={styles.cartSummary} >
                                    <button className={styles.clearBtn} onClick={() => handleClear()}>
                                        Clear Cart
                                    </button>
                                    <div className={styles.cartCheckout} >
                                        <div className={styles.subtotal} >
                                            <span>Subtotal</span>
                                            {<span className={styles.amount} >  R {totalAmount}</span>}
                                        </div>
                                        <p>Taxes and shipping calculated at checkout</p>

                                        <button onClick={() => checkLogin()} >Check out</button>

                                    </div>
                                </div>


                            </div>
                        </>
                    )}

                </div>
            </LayoutMain>

        </>
    );

};

export default withHome(Cart);