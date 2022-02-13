import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import { listProductDetails, productListReducer } from './productReducer'
import { userSignInReducer, userSignUpReducer } from './userReducer'
import { orderDetailReducer, orderListReducer, orderPaidReducer, orderReducer } from './orderReducer'


const reducers = combineReducers({
    productList: productListReducer,
    productDetail: listProductDetails,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    placeOrder: orderReducer,
    orderDetail: orderDetailReducer,
    orderList: orderListReducer,
    orderPaid: orderPaidReducer,
})


export default reducers
export type State = ReturnType<typeof reducers>