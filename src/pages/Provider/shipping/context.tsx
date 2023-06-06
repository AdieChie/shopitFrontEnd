import { createContext } from 'react';

export interface IShipping {
   OrderId?: string;
   Address?: string;
   City?: string;
   Province?: string;
   ZipCode?: string;
   firstName?: string;
   surname?: string;
   phoneNumber?: string;
}

export const INITIAL_STATE: IShippingStateContext = {}

export interface IShippingStateContext {
   readonly shippingOrder?: IShipping;
}

export interface IShippingActionContext {
   shippingOrder: (payload: IShipping) => void;
}

const ShippingContext = createContext<IShippingStateContext>(INITIAL_STATE);
const ShippingActionContext = createContext<IShippingActionContext>(undefined);
export { ShippingActionContext, ShippingContext };