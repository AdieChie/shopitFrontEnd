import { ProductActionEnum } from "./actions";
import { IProductStateContext } from "./context";

export function ProductReducer(incomingState: IProductStateContext, action: ReduxActions.Action<IProductStateContext>): IProductStateContext {
    const { type, payload } = action;

    switch (type) {
        case ProductActionEnum.getProductsRequest:

        case ProductActionEnum.searchProductsRequest:

        case ProductActionEnum.getCategoriesRequest:

        case ProductActionEnum.setIsDefaultRequestAction:

        case ProductActionEnum.getBrandsRequest:

        case ProductActionEnum.getByFilterRequest:
            return { ...incomingState, ...payload };
        default:
            return incomingState;
    }
}