import { createStore,  applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { product, user } from './interfaces';

console.log(localStorage.getItem('cartItems') ?? "nothing in cart");
const cartItemFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') ?? "") : []

const userFromStorage = localStorage.getItem('UserInfo') ?
    JSON.parse(localStorage.getItem('UserInfo') ?? "") : null
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
        shippingAddress: {}
    },
    userSignIn : {
        user: userFromStorage,
        error: "",
        loading: false
    }
}
const middleware = [thunk]

const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store