
import { MailOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './layout.module.css'

const Footer = () => {
    return (
            <footer className={styles.Footer}>
                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                        <PhoneOutlined />
                        </div>
                        <h5>Call Us</h5>
                        <p>081 111 000</p>
                    </div>
                </div>

                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                        <HomeOutlined />
                        </div>
                        <h5>Headquater</h5>
                        <a >265B West Avenue</a>
                    </div>
                </div>

                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                        <MailOutlined />
                        </div>
                        <h5>Email Us</h5>
                        <p>Shop@customers.co.za</p>
                    </div>
                </div>

                <div className="col-12 col-md-4 contact-Box">
                    <div className="box-info">
                        <div className="info-image">
                        <InfoCircleOutlined />
                        </div>
                        <h5>About Us</h5>
                        <a href="/about">About Shop&Smile</a>
                    </div>
                </div>

            </footer>

    );
}

export default Footer;