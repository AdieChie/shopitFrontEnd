import { createContext } from 'react';

export interface IOrderItems {
    productId?: string;
    quantity?: number;
    amount?: number;
    orderId?: string;
    name?: string;
    id?:string;
}

export interface IOrder {
    customerId?: string;
    orderNumber?:string;
    items?: IOrderItems[];
    status?: string;
    id?:string;


}
export interface IUpdateOrder{
    id?:string;
    status?: string;
}

export const INITIAL_STATE: IOrderStateContext = {}

export interface IOrderStateContext {
    readonly order?: IOrder | IUpdateOrder;
    readonly orders?:IOrder[];
    readonly orderItems?: IOrderItems[];
   // readonly customerOrder?:IOrder[];
    
}

export interface IOrderActionContext {
    createOrder: (payload: IOrder) => void;
    //getOrders: ()=>void;
    updateOrder: (payload: IUpdateOrder)=>void;
    deleteOrder:(id:string) => void;
    getOrderItems: (id:string)=>void;
    getOrdersByCustomerId: (id:string) => void;
}
const OrderContext = createContext<IOrderStateContext>(INITIAL_STATE);

const OrderActionContext = createContext<IOrderActionContext>(undefined);
export { OrderContext, OrderActionContext };