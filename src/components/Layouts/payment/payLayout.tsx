import Footer from './footer';
import  React,{PropsWithChildren} from 'react' ;
import NavBar from './navBar';
import styles from './styles.module.css'



const Layout =({ children }:PropsWithChildren) => {
    return (
        <div className={styles.content}>
            <NavBar />
            {children}
            <Footer/>
        </div>

    );
}

export default Layout;