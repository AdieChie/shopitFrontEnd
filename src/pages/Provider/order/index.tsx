import React, { FC, PropsWithChildren, useReducer, useContext } from 'react';
import { OrderReducer } from './reducer';
import { INITIAL_STATE, IOrder, OrderActionContext, OrderContext, IUpdateOrder } from './context';
import { createOrderRequestAction, getOrderItemsRequestAction,getOrdersByCustomerIdRequestAction } from './action';
import { message } from 'antd';
import { useUser } from '../user';

const key = 'updatable';

const openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
        message.success({ content: 'Your order has been deleted successfully', key, duration: 2 });
    }, 1000);
};



const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);
    const {currentUser} =useUser();

    const createOrder = async (orderInfo: IOrder) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Order/Create', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
            body: JSON.stringify(orderInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createOrderRequestAction(orderInfo));
                localStorage.setItem('order', JSON.stringify(data.result))

            })
        })
    }

   

    const getOrdersByCustomerId = async (id:string) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/Order/GetByCustomerId?id=${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getOrdersByCustomerIdRequestAction(data.result.items));
                console.log('rixo' ,data.result.items);

            })
        })
    }

    const getOrderItems = async (id: string) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/OrderItem/GetByOrderId?id=${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getOrderItemsRequestAction(data.result));
                console.log("items", data.result)

            })
        })
    }

    const updateOrder = async (orderInfo: IUpdateOrder) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Order/Update', {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
            body: JSON.stringify(orderInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createOrderRequestAction(orderInfo));
                localStorage.setItem('order', JSON.stringify(data.result))
            })
        })
    }

    const deleteOrder = async (id: string) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/Order/Delete?id=${id}`, {
            method: 'DELETE',
            cache: "no-cache",
            headers: {
                'Authorization': `Bearer  ${token}`
            },
        }).then(() => {
            getOrdersByCustomerId(currentUser.id)
            openMessage();

        })
    }
    return (
        <OrderContext.Provider value={state} >
            <OrderActionContext.Provider value={{
                createOrder,
                updateOrder,
                deleteOrder,
                getOrderItems,
                getOrdersByCustomerId
            }}>
                {children}
            </OrderActionContext.Provider>
        </OrderContext.Provider>
    )
}

function useOrderState() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useOrderActions() {
    const context = useContext(OrderActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useOrders() {
    return {
        ...useOrderState(),
        ...useOrderActions()
    }
}

export { OrderProvider, useOrderState, useOrderActions, useOrders };