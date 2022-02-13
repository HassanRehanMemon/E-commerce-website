import axios from "axios";
import { Dispatch } from "redux";
import { AddToCart } from "../constants";
import { product } from "../interfaces";
import { State } from "../reducers";

export const cartAddItemAction = (id: any, qty: number) => async (dispatch: Dispatch, getState: () => State) => {
    const res = await axios.get(`/api/products/${id}`)
    const product = res.data as product
    console.log(product);

    dispatch({
        type: AddToCart.ADD,
        payload: {
            product_id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    // localStorage.setItem('cartItems', "")

}

export const cartRemoveItemAction = (product_id: string) => (dispatch: Dispatch, getState: ()=> State) =>{
    dispatch({type: AddToCart.REMOVE, payload: product_id})
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}


export const saveShippingAddressAction = (data: any) => (dispatch: Dispatch, getState: ()=> State) =>{
    console.log(data);
    dispatch({type: AddToCart.SAVE_SHIPPING, payload: data})
    
    localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
    
}


export const savePaymentAction = (data: string) => (dispatch: Dispatch, getState: ()=> State) =>{
    console.log(data);
    dispatch({type: AddToCart.SAVE_PAYMENT, payload: data})
    
    
}


export const calculatePriceAction = () => (dispatch: Dispatch, getState: ()=> State) =>{
    const data = Number(getState().cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2))
    let arr: number[] = []
    arr[0] = data > 100 ? 10 : 100  // 0: shipping Fee
    arr[1] = parseFloat((data * 0.15).toFixed(2)) // tax
    arr[2] = data + arr[1] + arr[0] //Total
    console.log(arr);
    dispatch({type: AddToCart.CALCULATE_PRICE, payload: arr})
    
    
}