import { PlaceOrder } from "../constants"
import { orderType, PlaceOrderAction, PlaceOrderState } from "../interfaces"

const initState: PlaceOrderState = {
    order: {} as orderType,
    error: "",
    loading: false,
    success: false,
}

export const orderReducer = (state: PlaceOrderState = initState, action: PlaceOrderAction) => {
    switch (action.type) {
        case PlaceOrder.REQUEST:
            return { ...state, loading: true, error: "" }

        case PlaceOrder.SUCCESS:
            return {
                ...state,
                order: action.payload,
                loading: false,
                success: true
            }

        case PlaceOrder.FAIL:
            return {
                ...state,
                error: action.payload,
                success: false,
                loading: false,
            }


        case PlaceOrder.RESET:
            return {
                ...state,
                order: {} as orderType,
                error: "",
                success: false,
                loading: false
            }

        default:
            return state
    }

}