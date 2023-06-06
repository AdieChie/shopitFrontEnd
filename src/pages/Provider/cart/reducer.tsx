import Item from "antd/lib/list/Item";
import { IProduct } from "../Products/context";
import { CartActionEnum } from "./actions";
import { ICartStateContext } from './context';

export function CartReducer(incomingState: ICartStateContext, action: ReduxActions.Action<ICartStateContext>): ICartStateContext {

    const { type, payload } = action;

    switch (type) {
        case CartActionEnum.addToCartRequest:

            const newItem = { ...payload.item, quantity: 1 }
            return {
                ...incomingState,
                cartItems: [...(incomingState.cartItems as IProduct[]), newItem]
            }
        case CartActionEnum.removeFromCartRequest:
            return {
                ...incomingState,
                cartItems: (incomingState.cartItems as IProduct[]).filter((item) => item.id !== action.payload.item.id),
            }
        case CartActionEnum.clearCartRequest:
            return {
                ...incomingState,
                cartItems: [],
            }
        case CartActionEnum.increaseItemRequest:
            return {
                ...incomingState,
                cartItems: [...(incomingState.cartItems).map(prod => {
                    if (prod?.id === payload?.item?.id) {

                        return { ...prod, quantity: Number(prod?.quantity) + 1 }
                    }
                    return prod;
                })],
            }
        case CartActionEnum.decreaseItemRequest:
            return {
                ...incomingState,
                cartItems: [...(incomingState.cartItems).map(prod => {
                    if (prod?.id === payload?.item?.id) {

                        return { ...prod, quantity: Number(prod?.quantity) - 1 }
                    }
                    return prod;
                })],
            }
        case CartActionEnum.createOrderItemRequest:
            return { ...incomingState, ...payload };

        default:
            return incomingState;

    }
}