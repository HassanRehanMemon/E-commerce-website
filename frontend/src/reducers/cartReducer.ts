import { AddToCart } from '../constants';
import { AddToCartAction, addToCartProduct, AddToCartState, shippingAddressType } from '../interfaces';

const initState: AddToCartState = {
    cartItems: [],
    shippingAddress: {} as shippingAddressType,
    paymentMethod: ""
}

const cartReducer = (state: AddToCartState = initState, action: AddToCartAction) => {
    switch (action.type) {
        case AddToCart.ADD:
            const item = action.payload as addToCartProduct
            const existItem = state.cartItems.find((cartItem) =>
                cartItem.product_id === item.product_id
            )
            console.log(existItem);

            if (existItem) {
                console.log('replacing item : already exits');
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) => {
                        return cartItem.product_id === item.product_id ? item : cartItem
                    })
                }
            }
            else {
                console.log('adding new item');
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case AddToCart.REMOVE:
            const id = action.payload as string
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => {
                    return item.product_id !== id
                })
            }

        case AddToCart.SAVE_SHIPPING:
            console.log(action.payload);
            return {
                ...state,
                shippingAddress: action.payload as shippingAddressType
            }

        case AddToCart.SAVE_PAYMENT:
            return {
                ...state,
                pyamentMethod: action.payload
            }

        default:
            return state

    }

};

export default cartReducer;
