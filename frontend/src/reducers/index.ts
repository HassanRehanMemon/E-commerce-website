import { combineReducers } from 'redux'
import { listProductDetails, productListReducer } from './productReducer'

const reducers =  combineReducers({
    productList : productListReducer,
    productDetail: listProductDetails,
})


export default reducers 
export type State = ReturnType<typeof reducers> 