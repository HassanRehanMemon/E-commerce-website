import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { product } from './interfaces';

console.log(localStorage.getItem('cartItems') ?? "nothing in cart");
const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') ?? "") : []

const initState = {
    productList: {

        products: [],
        error: "",
        loading: true
    },
    productDetail: {

        product: <product>{},
        error: "",
        loading: true
    },
    cart: {

        cartItems: cartItemFromStorage,
        shippingAddress: {}
    },
    userSignIn : {
        user: {},
        error: "",
        loading: true
    }
}
const middleware = [thunk]

const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store