import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import { UserProvider } from './Provider/user'
import { CartProvider } from './Provider/cart'
import { OrderProvider } from './Provider/order';
import { ShippingProvider } from './Provider/shipping';
import { ProductProvider } from './Provider/Products';
import { PaymentProvider } from './Provider/payment';
import { QuestionProvider } from './Provider/questions';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>

    <ProductProvider>
      <QuestionProvider>
        <OrderProvider>
          <ShippingProvider>
            <CartProvider>
              <PaymentProvider>
              <Component {...pageProps} />
              </PaymentProvider>
            </CartProvider>
          </ShippingProvider>
        </OrderProvider>
        </QuestionProvider>
    </ProductProvider>
    </UserProvider>

  )
}

export default   MyApp
