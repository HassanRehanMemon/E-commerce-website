import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import { listProductDetails, productListReducer } from './productReducer'


const reducers =  combineReducers({
    productList : productListReducer,
    productDetail: listProductDetails,
    cart : cartReducer,
})


export default reducers 
export type State = ReturnType<typeof reducers> 