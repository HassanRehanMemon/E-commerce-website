import axios from "axios"
import { Dispatch } from "redux"
import { OrderDeliver, OrderDetail, OrderList, OrderListAsAdmin, OrderPaid, PlaceOrder } from "../constants"
import { addToCartProduct, shippingAddressType } from "../interfaces"
import { State } from "../reducers"


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



export const orderListAction = (token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: OrderList.REQUEST })

        const config = {
            headers: {

                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(
            '/api/orders/userOrders',
            config
        )

        dispatch({ type: OrderList.SUCCESS, payload: data })

    } catch (error: any) {
        dispatch({
            type: OrderList.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })

    }
}



export const orderPaidAction = (id: string, token: string, paymentResult: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: OrderPaid.REQUEST })

        const config = {
            headers: {

                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay`,
            paymentResult,
            config
        )

        dispatch({ type: OrderPaid.SUCCESS, payload: data })

    } catch (error: any) {
        dispatch({
            type: OrderPaid.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })

    }
}



export const orderListAsAdminAction = () => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: OrderListAsAdmin.REQUEST })

        const config = {
            headers: {

                'Content-type': 'application/json',
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }

        const { data } = await axios.get(
            '/api/orders',
            config
        )

        dispatch({ type: OrderListAsAdmin.SUCCESS, payload: data })

    } catch (error: any) {
        dispatch({
            type: OrderListAsAdmin.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })

    }
}



export const orderDeliverAction = (id: string) => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: OrderDeliver.REQUEST })

        const config = {
            headers: {

                'Content-type': 'application/json',
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/deliver`,
            {},
            config
        )

        dispatch({ type: OrderDeliver.SUCCESS})

    } catch (error: any) {
        dispatch({
            type: OrderDeliver.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,

        })

    }
}