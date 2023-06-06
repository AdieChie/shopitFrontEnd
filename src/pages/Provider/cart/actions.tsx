import { createAction } from 'redux-actions';
import { IProduct, ICartStateContext} from './context';

export enum CartActionEnum{
    addToCartRequest= 'ADD_TO_CART',
    removeFromCartRequest= 'REMOVE_FROM_CART',
    clearCartRequest= 'CLEAR_CART',
    increaseItemRequest = 'INCREASE_ITEM',
    decreaseItemRequest = 'DECREASE_ITEM',
    createOrderItemRequest = 'CREATE_ORDER_ITEM',
 
}


// export interface IAddCArt  extends Omit<ICartStateContext,'cartItems'>{

// }
export const addToCartRequestAction = createAction<ICartStateContext,IProduct>(CartActionEnum.addToCartRequest,(item)=>({item}));
export const removeFromCartRequestAction = createAction<ICartStateContext,IProduct>(CartActionEnum.removeFromCartRequest,(item)=>({item}));
export const clearCartRequestAction = createAction<ICartStateContext>(CartActionEnum.clearCartRequest,()=>({item: {}}));
export const increaseItemRequestAction = createAction<ICartStateContext,IProduct>(CartActionEnum.increaseItemRequest,(item)=>({item}));
export const decreaseItemRequestAction = createAction<ICartStateContext,IProduct>(CartActionEnum.decreaseItemRequest,(item)=>({item}));
export const createOrderItemRequestAction = createAction<ICartStateContext,IProduct>(CartActionEnum.createOrderItemRequest,(item)=>({item}));
