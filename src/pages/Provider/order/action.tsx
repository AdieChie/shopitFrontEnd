import { createAction } from "redux-actions";
import {IOrder, IOrderStateContext, IOrderItems} from './context';

export enum OrderActionEnum{
    createOrderRequest = 'CREATE_ORDER',
    //getOrdersRequest = 'GET_ALL_ORDERS',
    updateOrderRequest = 'UPDATE_ORDER',
    deleteOrderRequest = 'DELETE_ORDER',
    getOrderItemsRequest = 'GET_ALL_ORDERS_ITEMS',
    getOrdersByCustomerIdRequest= 'GET_ALL_BY_CUSTOMER_ID',
}

export const createOrderRequestAction = createAction<IOrderStateContext, IOrder>(OrderActionEnum.createOrderRequest,(order)=>({order}));
//export const getOrdersRequestAction = createAction<IOrderStateContext, IOrder[]>(OrderActionEnum.getOrdersRequest,(orders)=>({orders}));
export const updateOrderRequestAction = createAction<IOrderStateContext, IOrder>(OrderActionEnum.updateOrderRequest,(order)=>({order}));
export const deleteOrderRequestAction = createAction<IOrderStateContext,IOrder>(OrderActionEnum.deleteOrderRequest,(order)=>({order}));
export const getOrderItemsRequestAction = createAction<IOrderStateContext, IOrderItems[]>(OrderActionEnum.getOrderItemsRequest,(orderItems)=>({orderItems}));
export const getOrdersByCustomerIdRequestAction = createAction<IOrderStateContext,IOrder[]>(OrderActionEnum.getOrdersByCustomerIdRequest,(orders)=>({orders}));