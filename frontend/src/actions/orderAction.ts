import axios from "axios"
import { Dispatch } from "redux"
import { OrderDetail, PlaceOrder } from "../constants"
import { addToCartProduct, shippingAddressType } from "../interfaces"


export const placeOrderAction =
    (

        cartItems: addToCartProduct[],
        shippingAddress: shippingAddressType,
        paymentMethod: string,
        shippingFee: number,
        tax: number,
        totalPrice: number,
        token: string
    ) => async (dispatch: Dispatch) => {

        try {

            dispatch({ type: PlaceOrder.REQUEST })

            const config = {
                headers: {

                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post(
                '/api/orders/',
                { cartItems, shippingAddress, paymentMethod, shippingFee, tax, totalPrice },
                config
            )

            dispatch({ type: PlaceOrder.SUCCESS, payload: data })
        } catch (error: any) {
            dispatch({
                type: PlaceOrder.FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,

            })

        }

    }


export const orderDetailAction = (id: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: OrderDetail.REQUEST })

        const config = {
            headers: {

                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
        )

        dispatch({ type: OrderDetail.SUCCESS, payload: data })

    } catch (error: any) {
        dispatch({
            type: OrderDetail.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })

    }
}