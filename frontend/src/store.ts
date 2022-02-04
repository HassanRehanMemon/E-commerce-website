import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const initState = {}
const middleware = [thunk]

const store= createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store 