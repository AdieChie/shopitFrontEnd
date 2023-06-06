import Footer from './footer';
import  React,{PropsWithChildren} from 'react' ;
import NavBar from './navBar';
import styles from './layout.module.css'



const LayoutMain =({ children }:PropsWithChildren) => {
    return (
        <div className={styles.content}>
            <NavBar isdefault={false} />
            {children}
            <Footer/>
        </div>

    );
}

export default LayoutMain;