import { createAction } from "redux-actions";
import {IPayment, IPaymentStateContext} from './context';

export enum PaymentActionEnum{
    createPaymentRequest = 'CREATE_PAYMENT'
}

export const createPaymentRequestAction = createAction<IPaymentStateContext, IPayment>(PaymentActionEnum.createPaymentRequest,(payment)=>({payment}));