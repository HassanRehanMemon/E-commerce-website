import { AddToCart } from '../constants';
import { AddToCartAction, AddToCartState } from '../interfaces';

const initState: AddToCartState = {
    cartItems: [],
    shippingAddress: {}

}

const cartReducer = (state: AddToCartState = initState, action: AddToCartAction) => {
    switch (action.type) {
        case AddToCart.ADD:
            const item = action.payload
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
            const id = action.id_toBeRemoved
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => {
                    return item.product_id !== id
                })
            }

        default:
            return state

    }

};

export default cartReducer;
