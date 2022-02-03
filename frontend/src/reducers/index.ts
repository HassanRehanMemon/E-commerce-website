import { combineReducers } from 'redux'
import { productListReducer } from './productReducer'

const reducers =  combineReducers({
    productList : productListReducer,
})


export default reducers 
export type State = ReturnType<typeof reducers> 