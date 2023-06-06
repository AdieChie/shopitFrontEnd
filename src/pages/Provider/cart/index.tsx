import React, { FC, PropsWithChildren, useContext, useReducer, useState } from 'react';
import { CartReducer } from './reducer';
import { INITIAL_STATE, IProduct, CartActionContext, CartContext } from './context';
import { addToCartRequestAction, removeFromCartRequestAction ,clearCartRequestAction, increaseItemRequestAction, decreaseItemRequestAction
   , createOrderItemRequestAction } from './actions';

const CartProvider: FC<PropsWithChildren> = ({ children }) => {


    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);


    const addToCart = (item: IProduct) => {
      
        dispatch(addToCartRequestAction(item))
       
        
    };

    const removeFromCart = (item: IProduct) => {
        dispatch(removeFromCartRequestAction(item))        
    }

    const clearCart =()=>{
        dispatch(clearCartRequestAction())
    }

    const increaseItem =(item:IProduct)=>{
        dispatch(increaseItemRequestAction(item))
    }

    const decreaseItem =(item:IProduct)=>{

        dispatch(decreaseItemRequestAction(item))
    }

    const createOrderItem = async (orderItem: IProduct) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/OrderItem/Create',{
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization':`Bearer  ${token}`
            },
            body: JSON.stringify(orderItem)
        }).then(res => {
            res.json().then(data => {
                dispatch(createOrderItemRequestAction(orderItem));
            })
        })
      }

    return (
        <CartContext.Provider value={state}>
            <CartActionContext.Provider value={{
                addToCart,
                removeFromCart,
                clearCart,
                increaseItem,
                decreaseItem,
                createOrderItem,
            }}>
                {children}
            </CartActionContext.Provider>
        </CartContext.Provider>
    )
}

function useCartState() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useCartActions() {
    const context = useContext(CartActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useMain() {
    return {
        ...useCartState(),
        ...useCartActions()
    }
}

export { CartProvider, useCartState, useCartActions, useMain };