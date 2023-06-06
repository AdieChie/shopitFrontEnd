import Link from 'next/link';
import styles from './styles.module.css'
import { UserOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useUser } from '../../../pages/Provider/user';
import Router, { useRouter } from 'next/router';
import { IUser } from '../../../pages/Provider/user/context';
import { useEffect, useState } from 'react';
import { useProducts } from '../../../pages/Provider/Products';
import { BiArrowBack, BiHelpCircle } from 'react-icons/Bi'
import { FiHelpCircle } from 'react-icons/Fi';
import { Button, Modal, Collapse, Image } from 'antd';
import { useQuestions } from '../../../pages/Provider/questions';

const { Panel } = Collapse;

const NavBar = () => {
    const { logOutUser, currentUser } = useUser();
    const { getProducts } = useProducts();
    const { push } = useRouter();
    const { getQuestions, questions } = useQuestions();


    useEffect(() => {
        if (currentUser != undefined) {
            console.log(currentUser)
        }
    }, [currentUser])

    useEffect(() => {
        if (questions === undefined) {
            getQuestions();
        }
    }, [questions])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="Need Help?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {questions?.map(question => {
                    return (<>
                        <Collapse defaultActiveKey={['1']} >
                            <Panel header={question.question} key="1">
                                <p key={question.id}>{question.answer}</p>
                            </Panel>
                        </Collapse>
                    </>

                    )
                })
                }
            </Modal>
            <nav className={styles.nav} >
                <a className={styles.back} onClick={() => push('/cart')}><BiArrowBack size={20} /></a>
                <div className={styles.logo}>

                    <a href="/"><Image src={'./log.png'} height='3' width='3' className={styles.logoImg} preview={false} alt='' /> </a>
                </div>
                <a className={styles.help}><FiHelpCircle size={25} onClick={showModal} /></a>
            </nav>
        </>
    );
}

export default NavBar;


