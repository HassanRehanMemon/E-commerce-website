import React from 'react';
import { AddToCart } from '../constants';
import { AddToCartAction, AddToCartState } from '../interfaces';

const initState : AddToCartState = {
    cartItems : [],
    shippingAddress: {}

}

const cartReducer = (state: AddToCartState = initState, action: AddToCartAction) => {
    switch (action.type) {
        case AddToCart.ADD:
            const item = action.payload
            const existItem = state.cartItems.map((cartItem) => {
                return cartItem.product_id === item.product_id
            }) 
            
            if( existItem){
                return {
                    ...state,
                    cartItem : state.cartItems.map((cartItem) => {
                        return cartItem.product_id === item.product_id ? item : cartItem
                    })
                }
            }
            else{
                return {
                    ...state,
                    cartItem : [...state.cartItems, item]
                }
            }

        default:
            return state

    }

};

export default cartReducer;
