import { createContext } from "react";

export interface IPayment{
    orderId?: string;
    method?: number;
    amount?: number;

}

export const INITIAL_STATE: IPaymentStateContext ={}

export interface IPaymentStateContext{
    readonly payment?: IPayment;
}

export interface IPaymentActionContext {
    createPayment: (payload:IPayment) => void;
}
const PaymentContext = createContext<IPaymentStateContext>(INITIAL_STATE);

const PaymentActionContext = createContext<IPaymentActionContext>(undefined);

export {PaymentActionContext, PaymentContext};