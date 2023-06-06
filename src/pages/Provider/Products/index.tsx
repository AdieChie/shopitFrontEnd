import React, { FC, PropsWithChildren, useReducer, useContext, useState } from 'react';
import { ProductReducer } from './reducer';
import { INITIAL_STATE, ProductActionContext, ProductContext } from './context';
import { getProductsRequestAction, searchProductsRequestAction,setIsDefaultRequestAction } from './actions';

const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);


    const getProducts = async () => {
        dispatch(setIsDefaultRequestAction(true))
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Product/GetAll', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getProductsRequestAction(data.result));
            
            })
        })
    }

    const searchProducts = async (term: string) => {
        const token = localStorage.getItem("token");
        dispatch(setIsDefaultRequestAction(false))
        await fetch(`https://localhost:44311/api/services/app/Product/GetBySearch?term=${term}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(searchProductsRequestAction(data.result));
                console.log("search result", data.result)
            })
        })
    }

    const getCategories = async (category: string) => {
        const token = localStorage.getItem("token");
        dispatch(setIsDefaultRequestAction(false))
        await fetch(`https://localhost:44311/api/services/app/Product/GetByCategory?term=${category}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getProductsRequestAction(data.result));
                console.log("accessories result", data.result)
            })
        })
    }

    const getBrands = async (brand: string) => {
        const token = localStorage.getItem("token");
        dispatch(setIsDefaultRequestAction(false))
        await fetch(`https://localhost:44311/api/services/app/Product/GetByBrands?term=${brand}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getProductsRequestAction(data.result));
                console.log("accessories result", data.result)
            })
        })
    }

    const getFiltered = async (term: string ,minPrice: number, maxPrice: number) => {
        const token = localStorage.getItem("token");
        dispatch(setIsDefaultRequestAction(false))
        await fetch(`https://localhost:44311/api/services/app/Product/GetByFilter?term=${term}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization':`Bearer  ${token}`
            }
        }).then(res => {
            res.json().then(data => {
                dispatch(getProductsRequestAction(data.result));
                console.log("accessories result", data.result)
            })
        })
    }

    return (
        <ProductContext.Provider value={state}>
            <ProductActionContext.Provider value={
                {
                    getProducts,
                    getCategories,
                    searchProducts,
                    getBrands,
                    getFiltered
                }}>
                {children}
            </ProductActionContext.Provider>
        </ProductContext.Provider>
    )
}
function useProductState() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useProductActions() {
    const context = useContext(ProductActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useProducts() {
    return {
        ...useProductState(),
        ...useProductActions()
    }
}

export { useProductState, ProductProvider, useProductActions, useProducts };