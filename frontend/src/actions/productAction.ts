import { Dispatch } from "redux";
import { ProductList } from "../constants";
import axios from 'axios'


export const listProducts = () => async (dispatch: Dispatch) => {

    try {
        dispatch({ type: ProductList.REQUEST })
        const data = await axios.get('/api/products')
        console.log(data.data)
        dispatch({ type: ProductList.SUCCESS, payload: data.data })


    } catch (error) {
        dispatch({ type: ProductList.FAIL, payload: error })


    }
}