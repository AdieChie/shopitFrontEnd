import { Breadcrumb, Layout, Menu, Image } from 'antd';
import React from 'react';
import style from './style.module.css'
import { FaRegHandshake } from 'react-icons/Fa';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => (
    <Layout className="layout">
        <Header className={style.header}>
            <a href="/">Back to Shop</a>
            <div className={style.logo} >
            <Image src ={'./log.png'} height='3' width='3'  className={style.logoImg} preview={false} alt=''/>
            </div>
            <Menu
                mode="horizontal"
            />
        </Header>
        <Content className={style.content}>
            <div className={style.pic}>
                <Image src={'https://www-file.huawei.com/-/media/corp2020/abouthuawei/corporate-information/corp-info-banner.jpg'} height={300} width={'100%'} alt='' preview={false} className={style.img} />
                <div className={style.info}>
                    <p className={style.title}>About Us</p>
                    <p className={style.para1}>shop&smile is one of South Africa’s much-loved technology retail store.
                        If you’re looking for the widest range of leading national and international brands, shop&smile is the place to go.Yes, we have a comprehensive range of innovative products.
                        Yes, our range extends from practical solutions for any home or business environment to specialist products that push the boundaries of technology.
                        If you want tech, we’ve got it. What really sets us apart is our service offering.
                        Our technical expertise together with top-notch service and after-sales support is what keeps our customers coming back; time after time, year after year</p>
                </div>

            </div>
            <div>
                <p className={style.title2}>We bring technology solutions to life </p>
                <p className={style.para}> At shop&smile, we like to make tech easy.
                    It’s why we have our very own Techxperts to provide expert advice as well as assistance with installations,
                    upgrades and technical repairs. Whether you need help in-store or on-site (home or office),
                    with Incredible Solutions you can consider any technology problem solved, in one of the best repair turn-around times in the country.</p>
            </div>

            <div>
                <p  className={style.title2}>
                    So much more than just the best hardware and consumables</p>
                <p className={style.para}>
                    If the future is about connectivity, Incredible Connection ensures you’re plugged in.
                    From technical services to business rental packages; data contracts, upgrades, Incredible
                    Cloud data storage and a data recovery service. Then we offer a comprehensive on-line shopping experience,
                    a range of payment options, three rewards partners and a worthwhile trade-in programme.
                </p>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© shop&smile 2022. All rights reserved. </Footer>
    </Layout>
);

export default App;