import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { product, shippingAddressType } from './interfaces';

const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') ?? "") : []

const userFromStorage = localStorage.getItem('UserInfo') ?
    JSON.parse(localStorage.getItem('UserInfo') ?? "") : null

const shippingAddressStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress') ?? "") : {} as shippingAddressType


const initState = {
    productList: {

        products: [],
        error: "",
        loading: true
    },
    productDetail: {

        product: {} as product,
        error: "",
        loading: true
    },
    cart: {
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressStorage,
        paymentMethod: "",
        shippingFee: 0,
        tax: 0,
        totalPrice: 0,
    },
    userSignIn: {
        user: userFromStorage,
        error: "",
        loading: false
    },
    userSignUp: {
        user: userFromStorage,
        error: "",
        loading: false
    },
}
const middleware = [thunk]

const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store