import { AddToCart } from '../constants';
import { AddToCartAction, addToCartProduct, AddToCartState, shippingAddressType } from '../interfaces';

const initState: AddToCartState = {
    cartItems: [],
    shippingAddress: {} as shippingAddressType,
    paymentMethod: "",
    shippingFee: 0,
    tax: 0,
    totalPrice: 0,
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
                paymentMethod: action.payload
            }

        case AddToCart.CALCULATE_PRICE:
            return {
                ...state,
                shippingFee: action.payload[0],
                tax: action.payload[1],
                totalPrice: action.payload[2],
            }
            
        case AddToCart.RESET:
            return initState    

        default:
            return state

    }

};

export default cartReducer;
