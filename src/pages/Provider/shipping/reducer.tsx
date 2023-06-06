import { ShippingActionEnum } from "./action";
import { IShippingStateContext } from "./context";

export function ShippingReducer(incomingState: IShippingStateContext, action: ReduxActions.Action<IShippingStateContext>): IShippingStateContext {
    const { type, payload } = action;
    switch (type) {
        case ShippingActionEnum.shippingOrderRequest:
            return { ...incomingState, ...payload };
        default:
            return incomingState;
    }
}