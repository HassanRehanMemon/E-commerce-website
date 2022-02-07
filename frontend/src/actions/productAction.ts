import { Dispatch } from "redux";
import { ProductDetail, ProductList } from "../constants";
import axios from 'axios'
import { product } from "../interfaces";


export const listProducts = () => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: ProductList.REQUEST })
        const data = await axios.get('/api/products')
        dispatch({ type: ProductList.SUCCESS, payload: data.data as product[] })


    } catch (error: any) {
        dispatch({
            type: ProductList.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })


    }
}

export const listDetailProduct = (id: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ProductDetail.REQUEST })
        const product = await axios.get(`/api/products/${id}`)
        dispatch({ type: ProductDetail.SUCCESS, payload: product.data as product })
    } catch (error: any) {
        dispatch({
            type: ProductDetail.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })

    }
}