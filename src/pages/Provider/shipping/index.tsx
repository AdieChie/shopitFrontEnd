import React, {FC, PropsWithChildren, useReducer, useContext} from 'react';
import { ShippingReducer } from './reducer';
import{ INITIAL_STATE,IShipping, ShippingActionContext, ShippingContext} from './context';
import {shippingOrderRequestAction} from './action';

const ShippingProvider: FC<PropsWithChildren> =({ children}) =>{
    const [state, dispatch] =useReducer(ShippingReducer, INITIAL_STATE);

    const shippingOrder = async (shippingInfo:IShipping) =>{
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Shipping/Create',{
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization':`Bearer  ${token}`
            },
            body: JSON.stringify(shippingInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(shippingOrderRequestAction(shippingInfo));
                localStorage.setItem('shipping', JSON.stringify(data.result))
            })
        })
    }
    return(
        <ShippingContext.Provider value={state}>
            <ShippingActionContext.Provider value={{shippingOrder}}>
                {children}
            </ShippingActionContext.Provider>
        </ShippingContext.Provider>
    )
}

function useShippingState(){
    const context = useContext(ShippingContext);
    if(!context){
        throw new Error("ShippingState must be used within a AuthProvider");
    }
    return context;
}

function useShippingActions(){
    const context = useContext(ShippingActionContext);
    if(context == undefined){
        throw new Error("ShippingActionContext must be used within a AuthProvider");
    }
    return context;
}

function useShipping(){
return{
    ...useShippingState(),
    ...useShippingActions()
}
}
export {ShippingProvider, useShippingState, useShippingActions, useShipping};