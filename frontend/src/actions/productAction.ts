import { Dispatch } from "redux";
import { ProductCreate, ProductDelete, ProductDetail, ProductEdit, ProductList } from "../constants";
import axios from 'axios'
import { product } from "../interfaces";
import { State } from "../reducers";


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



export const deleteProductAction = (id: any) => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: ProductDelete.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const product = await axios.delete(
            `/api/products/${id}`,
            config
        )
        dispatch({
            type: ProductDelete.SUCCESS
        })
    } catch (error: any) {
        dispatch({
            type: ProductDelete.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })

    }
}



export const createProductAction = () => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: ProductCreate.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const { data } = await axios.post(
            `/api/products/`,
            {},
            config
        )
        dispatch({
            type: ProductCreate.SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ProductCreate.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })

    }
}



export const ProductEditAction = (
    id: string,
    name: string,
    price: number,
    description: string,
    // image,
    brand: string,
    category: string,
    countInStock: number,
) => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: ProductEdit.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const { data } = await axios.put(
            `/api/products/${id}`,
            {

                name,
                price,
                description,
                // image,
                brand,
                category,
                countInStock,
            },
            config
        )

        dispatch({
            type: ProductEdit.SUCCESS,
            payload: data
        })

    } catch (error: any) {
        dispatch({
            type: ProductEdit.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};