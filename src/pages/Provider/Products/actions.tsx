import {createAction} from 'redux-actions';
import {IProduct, IProductStateContext} from './context';

export enum ProductActionEnum{
    getProductsRequest = 'GET_PRODUCTS',
    searchProductsRequest = 'GET_PRODUCTS',
    getCategoriesRequest = 'GET_CATEGORIES',
    setIsDefaultRequestAction = 'SET_IS_DEFAULT_REQUEST',
    getBrandsRequest= 'GET_BRAND',
    getByFilterRequest = 'GET_BY_FILTER',
}

export const getProductsRequestAction= createAction<IProductStateContext,IProduct[]>(ProductActionEnum.getProductsRequest,(products)=>({products}))
export const searchProductsRequestAction= createAction<IProductStateContext,IProduct[]>(ProductActionEnum.searchProductsRequest,(products)=>({products}))
export const getCategoriesRequest= createAction<IProductStateContext,IProduct[]>(ProductActionEnum.getCategoriesRequest,(products)=>({products}))
export const setIsDefaultRequestAction= createAction<IProductStateContext,boolean>(ProductActionEnum.setIsDefaultRequestAction,(isDefault)=>({isDefault}))
export const getBrandsRequestAction = createAction<IProductStateContext,IProduct[]>(ProductActionEnum.getBrandsRequest,(products)=>({products}))
export const getByFilterRequestAction= createAction<IProductStateContext,IProduct[]>(ProductActionEnum.getByFilterRequest,(products)=>({products}))
