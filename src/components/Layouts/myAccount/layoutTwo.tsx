
import React, { PropsWithChildren } from 'react';
import NavBar from './navBar';
import styles from './styles.module.css'




const LayoutTwo = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.layout} >
            <NavBar />
            {children}

        </div>

    );
}

export default LayoutTwo;