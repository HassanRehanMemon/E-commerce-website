import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import { AddReviewReducer, createProductReducer, deleteProductReducer, listProductDetails, productCarouselReducer, ProductEditReducer, productListReducer } from './productReducer'
import { userDeleteReducer, userDetailsReducer, userEditReducer, userListReducer, userSignInReducer, userSignUpReducer } from './userReducer'
import { orderDeliverReducer, orderDetailReducer, orderListAsAdminReducer, orderListReducer, orderPaidReducer, orderReducer } from './orderReducer'


const reducers = combineReducers({
    productList: productListReducer,
    productDetail: listProductDetails,
    delteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    productEdit: ProductEditReducer,
    productCarousel: productCarouselReducer,
    addReview: AddReviewReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userSignUp: userSignUpReducer,
    placeOrder: orderReducer,
    orderDetail: orderDetailReducer,
    orderList: orderListReducer,
    orderListAsAdmin: orderListAsAdminReducer,
    orderDeliver: orderDeliverReducer,
    orderPaid: orderPaidReducer,
    userList: userListReducer,
    userDetail: userDetailsReducer,
    userEdit: userEditReducer,
    userDelete: userDeleteReducer,
})


export default reducers
export type State = ReturnType<typeof reducers>