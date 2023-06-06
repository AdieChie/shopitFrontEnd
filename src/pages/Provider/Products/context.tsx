import { createContext } from 'react';

export interface IProduct{
    name?: string,
    image?: string,
    id?: string,
    price?: number,
    category?: string,
    brand?: string,
    decsription?:string,
}


export interface IProductStateContext{
    readonly products?: IProduct[];
    readonly isDefault?: boolean

}
export const INITIAL_STATE :IProductStateContext= {
    isDefault: true,
};

export interface IProductActionContext{
    getProducts: ()=>void;
    searchProducts: (term:string)=>void;
    getCategories: (category:string)=>void;
    getBrands:(brand:string)=>void;
    getFiltered: (term:string, minPrice:number , maxPrice:number )=>void;
}

const ProductContext =createContext<IProductStateContext>(INITIAL_STATE);

const ProductActionContext =createContext<IProductActionContext>(undefined);

export {ProductContext,ProductActionContext };