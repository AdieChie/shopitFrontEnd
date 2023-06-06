import Link from 'next/link';
import styles from './styles.module.css'
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useUser } from '../../../pages/Provider/user';
import Router from 'next/router';
import { IUser } from '../../../pages/Provider/user/context';
import { useEffect } from 'react';



const NavBar = () => {
    const { logOutUser, currentUser } = useUser();

    const handleLogOut = () => {
        logOutUser();
        Router.push('/')
    }

    useEffect(()=> {
        if (currentUser !=undefined) {
            console.log(currentUser)
        }
    },[currentUser])




    return (
        <nav className={styles.nav} >
            <div className={styles.userDetail}>
                {currentUser &&
              currentUser.userName.toUpperCase()
                }
            </div>
            <Link href="/dashboard"><a>Dashboard</a></Link>
            <Link href="/"><a>Shop</a></Link>
            {/* <Link href="/"><a>Profile</a></Link> */}
            <a onClick={()=> handleLogOut()}>Log out</a>
        </nav>
    );
}

export default NavBar;
