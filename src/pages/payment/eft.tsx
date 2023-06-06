import { Col, Divider, Row,Image } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from '../payment/styles.module.css';

const style: React.CSSProperties = { background: '#fff', padding: '8px 0',height:'10vw', borderRadius:'5px', border:'1px solid grey', boxShadow:'1px 5px 10px 1px grey' };

const EFT: React.FC = () => (
  <>

    <Row gutter={[16, 28]}>
      <Col className="gutter-row" span={8}  >
        <Link href='https://www.fnb.co.za/'>
        <div style={style} className={styles.bank}>
            <Image src={'https://play-lh.googleusercontent.com/w5wm4oVIYXuGlZGndac8YDh-yrpAnOzJJmqQIbdkhThh1ZBOn-PdiHaScgQF7O2Dnk4=w240-h480-rw'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}
            />
        </div>
        </Link>
      </Col>
      <Col className="gutter-row" span={8}>
        <Link href = 'https://www.absa.co.za/personal/'>
      <div style={style} className={styles.bank}>
            <Image src={'https://upload.wikimedia.org/wikipedia/en/thumb/d/de/ABSA_Group_Limited_Logo.svg/1200px-ABSA_Group_Limited_Logo.svg.png'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}/>
        </div>
        </Link>
      </Col>
      <Col className="gutter-row" span={8}>
        <Link href='https://www.capitecbank.co.za/'>
      <div style={style} className={styles.bank}>
            <Image src={'https://turntable.kagiso.io/images/capitec_bank_logo.width-800.png'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}/>
        </div>
        </Link>
      </Col>
      <Col className="gutter-row" span={8}>
      <Link href='https://www.standardbank.co.za/southafrica/personal/home'>
      <div style={style} className={styles.bank}>
            <Image src={'https://upload.wikimedia.org/wikipedia/commons/5/59/Standardbank.png'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}/>
        </div>
        </Link>
      </Col>
      <Col className="gutter-row" span={8}>
        <Link href="https://www.tymebank.co.za/">
      <div style={style} className={styles.bank}>
            <Image src={'https://stuff.co.za/wp-content/uploads/2021/09/Tyme-Bank-South-Africa-Banking-Money-Empowerment-1024x1024.jpg'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}/>
        </div>
        </Link>
      </Col>
      <Col className="gutter-row" span={8}>
        <Link href='https://personal.nedbank.co.za/home.html'>
      <div style={style} className={styles.bank}>
            <Image src={'https://www.bbrief.co.za/content/uploads/2018/10/Nedbank-logo-on-white-background.png'} style={{marginLeft:'3vw', objectFit:'contain', marginTop:'0.5vw'}}  
             height={'8vw'}
             alt=''
             preview={false}/>
        </div>
        </Link>
      </Col>
    </Row>
  </>
);

export default EFT;
