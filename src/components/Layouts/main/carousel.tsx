import { Image, Carousel } from 'antd';
import styles from './layout.module.css'


const Carousels = () => (
  <Carousel autoplay className={styles.carousel} >

    <div >
      <Image src={'https://dailytimes.com.pk/assets/uploads/2020/12/11/website-banner-1200x4181-1.png'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    <div>
      <Image src={'http://www.itelitservice.com/img/iwatch-banner.jpg'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    <div>
      <Image src={'https://machive.com.pk/wp-content/uploads/2020/10/iphone-12-pro-banner-islamabad.jpg'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    <div>
      <Image src={'https://currys-ssl.cdn.dixons.com/css/themes/samsung/2019/wearables/images/samsung-galaxy-watch-awards-banner.png'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    {/* <div>
      <Image src={'https://www.hirschs.co.za/media/wysiwyg/pre-order_hirsch_Web_Banner_850x250_1.jpg'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    <div>
      <Image src={'https://www.xiaomitoday.it/wp-content/uploads/2021/10/redmi-watch-2-lite-copertina.jpg'} className={styles.carouselImg} alt='' preview={false} />
    </div>
    <div>
      <Image src={'https://www.pinnacle.co.za/media/wysiwyg/Pinnacle-receives-Huawei-Consumer-Business-Website-banner-Article.jpg'} className={styles.carouselImg} alt='' preview={false} />
    </div> */}
  </Carousel>
);
export default Carousels;
