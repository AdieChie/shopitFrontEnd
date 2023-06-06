import React, {FC, PropsWithChildren, useReducer, useContext} from 'react';
import { OrderReducer } from './reducer';
import {INITIAL_STATE, IPayment,PaymentActionContext, PaymentContext} from './context';
import { createPaymentRequestAction } from './actions';
import { message } from 'antd';

const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Order Payment Successful!', key, duration: 2 });
  }, 1000);
};

const PaymentProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

    const createPayment = async (paymentInfo: IPayment) =>{
        const token = localStorage.getItem("token");
        await fetch( 'https://localhost:44311/api/services/app/Payment/Create',{
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization':`Bearer  ${token}`
            },
            body: JSON.stringify(paymentInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createPaymentRequestAction(paymentInfo));
                localStorage.setItem('payment', JSON.stringify(data.result));
                openMessage();
                
            })
        })
    }
    return(
        <PaymentContext.Provider value={state} >
            <PaymentActionContext.Provider value={{createPayment}}>
                {children}
            </PaymentActionContext.Provider>
        </PaymentContext.Provider>
    )
}
function usePaymentState() {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function usePaymentActions() {
    const context = useContext(PaymentActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function usePayments() {
    return {
        ...usePaymentState(),
        ...usePaymentActions()
    }
}

export { PaymentProvider, usePaymentState, usePaymentActions, usePayments };