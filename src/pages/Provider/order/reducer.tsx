import { OrderActionEnum } from "./action";
import { IOrderStateContext } from "./context";

export function OrderReducer(incomingState: IOrderStateContext, action: ReduxActions.Action<IOrderStateContext>): IOrderStateContext {
    const { type, payload } = action;

    switch (type) {
        case OrderActionEnum.createOrderRequest:
            return { ...incomingState, ...payload };
        // case OrderActionEnum.getOrdersRequest:
        //     return { ...incomingState, ...payload };
        case OrderActionEnum.updateOrderRequest:
            return { ...incomingState, ...payload };
        case OrderActionEnum.deleteOrderRequest:
            return { ...incomingState, ...payload };
        case OrderActionEnum.getOrderItemsRequest:
            return { ...incomingState, ...payload };
        case OrderActionEnum.getOrdersByCustomerIdRequest:
            return { ...incomingState, ...payload };
        default:
            return incomingState;
    }
}