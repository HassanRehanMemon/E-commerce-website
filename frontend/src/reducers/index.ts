import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import { listProductDetails, productListReducer } from './productReducer'
import { userSignInReducer, userSignUpReducer } from './userReducer'


const reducers =  combineReducers({
    productList : productListReducer,
    productDetail: listProductDetails,
    cart : cartReducer,
    userSignIn : userSignInReducer,
    userSignUp : userSignUpReducer
})


export default reducers 
export type State = ReturnType<typeof reducers> 