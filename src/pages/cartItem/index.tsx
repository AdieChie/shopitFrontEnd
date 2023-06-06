
import { IProduct } from "../Provider/cart/context";
import { DeleteOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import styles from "./styles.module.css";
import { useMain } from "../Provider/cart";
import withHome from "../../hocs/withAuth";



const CartItem = ({ ...item }: IProduct) => {
    const { removeFromCart, increaseItem, decreaseItem } = useMain();



    const handleRemove = () => {

        removeFromCart(item)
    }

    const handleIncrease = (item: IProduct) => {

        increaseItem(item)
    }

    const handleDecrease = (item: IProduct) => {
        if (item.quantity > 1)
            decreaseItem(item)
    }

    return (
        <>
            <div className={styles.cartItemsItem}>
                <div className={styles.prod}>
                    <Image src={item.image} alt='' key={item.id} preview={false} className={styles.cartProduct} />
                    <span className={styles.name}>
                        {item.name}
                    </span>

                </div>

                <div className={styles.cartProductPrice} >{item.price}</div>

                <div className={styles.cartProductQuantity}>
                    <button className={styles.qtyBtn} onClick={() => { handleDecrease(item) }} >
                        -
                    </button>
                    <div className={styles.count}>{item?.quantity}</div>
                    <button onClick={() => { handleIncrease(item) }}>+</button>
                </div>

                <div className={styles.cartProductTotalPrice} >

                    {item?.price * (item.quantity)}
                </div>
                <div>
                    <button className={styles.prodBtn} onClick={() => handleRemove()}>
                        <DeleteOutlined />
                    </button>
                </div>

            </div>

        </>

    );


};

export default withHome(CartItem);