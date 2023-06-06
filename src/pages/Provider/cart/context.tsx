import { createContext } from 'react';

export interface IProduct{
    name?: string ,
    image?: string,
    id?: string,
    price?: number,
    quantity?: number,
}


export interface ICartStateContext{
    readonly item : IProduct;
    readonly cartItems?: IProduct[];
}
export const INITIAL_STATE :ICartStateContext= {
    item:{},
    cartItems:[],
};

export interface ICartActionContext{
    addToCart?: (payload:IProduct) => void;
    removeFromCart?: (payload:IProduct) => void;
    clearCart?: () => void;
    increaseItem?: (payload:IProduct) => void;
    decreaseItem?: (payload:IProduct) => void;
    createOrderItem?: (payload:IProduct) => void;
}

const CartContext =createContext<ICartStateContext>(INITIAL_STATE);

const CartActionContext =createContext<ICartActionContext>({});

export {CartContext,CartActionContext };