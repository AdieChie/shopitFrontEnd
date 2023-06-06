import { PaymentActionEnum } from "./actions";
import { IPaymentStateContext } from "./context";

export function OrderReducer(incomingState: IPaymentStateContext, action: ReduxActions.Action<IPaymentStateContext>): IPaymentStateContext {
    const { type, payload } = action;

    switch (type) {
        case PaymentActionEnum.createPaymentRequest:
            return { ...incomingState, ...payload };
        default:
            return incomingState;
    }
}