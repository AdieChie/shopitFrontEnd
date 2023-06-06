import {createAction } from 'redux-actions';
import Shipping from '../../shipping';
import { IShipping, IShippingStateContext} from './context';

export enum ShippingActionEnum{
    shippingOrderRequest = 'SHIPPING_ORDER'
}

export const shippingOrderRequestAction = createAction<IShippingStateContext,IShipping>(ShippingActionEnum.shippingOrderRequest,(shippingOrder)=>({shippingOrder}))