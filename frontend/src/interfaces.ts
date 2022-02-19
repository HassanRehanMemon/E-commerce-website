
export interface product {
    _id: string
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
}

export interface user {
    _id: string
    name: string,
    email: string,
    isAdmin: string,
    token: string,

}


// product List reducer : to list all reducers

export interface ProductListAction {
    type: string
    payload?: any
};

export interface ProductListState {
    products?: product[],
    error?: string,
    loading: boolean
};

// Product Detail reducer: to list single product
export interface ProductDetailState {
    product: product,
    error?: string,
    loading: boolean
}

export interface productDetailAction {
    type: string
    payload?: any
}


export interface ProductCreateState {
    product: product,
    error?: string,
    loading: boolean,
    success: boolean
}

export interface productCraeteAction {
    type: string
    payload?: any
}

//Delete Product
export interface ProductDeleteState {
    error?: string,
    loading: boolean,
    success: boolean,
}

export interface productDeleteAction {
    type: string
    payload?: any
}



export interface ProductEditState {
    error: string,
    loading: boolean,
    success: boolean
}

export interface ProductEditAction {
    type: string,
    payload: any
}


export interface AddReviewState {
    error: string,
    loading: boolean,
    success: boolean
}

// ---------------- Cart ---------------
//// Add to cart reducer
export interface shippingAddressType {
    address: string,
    city: string,
    country: string,
    postalCode: string,
}
export interface AddToCartState {
    cartItems: addToCartProduct[]
    shippingAddress: shippingAddressType
    paymentMethod: string
    shippingFee: number
    tax: number
    totalPrice: number

}

export interface addToCartProduct {
    name: string
    product_id: string
    image: string
    price: number
    countInStock: number
    qty: number

}
export interface AddToCartAction {
    type: string,
    payload: any

}


//----------User----------  
//user login

export interface userSignInState {
    user: user,
    error?: string,
    loading: boolean
}

export interface userSignInAction {
    type: string
    payload?: any
}

//User Sign UP
export interface userSignUpState {
    user: user,
    error?: string,
    loading: boolean
}

export interface userSignUpAction {
    type: string
    payload?: any
}




//----------ORDER----------  
//place an order


export interface orderType {
    user_id: string
    cartItems: string,
    shippingAddress: shippingAddressType
    paymentMethod: string,
    shippingFee: number,
    tax: number,
    totalPrice: number
}
export interface PlaceOrderState {
    order: orderType
    error?: string,
    loading: boolean
    success: boolean

}

export interface PlaceOrderAction {
    type: string
    payload?: any
}

//Order Detail by Id
export interface FetchedOrderType {
    _id: string,
    user: {
        name: string,
        email: string,
    },
    orderItems: addToCartProduct[],
    shippingAddress: shippingAddressType
    paymentMethod: {
        id: string,
        status: string,
        update_time: string,
        email_address: string
    },
    shippingFee: number,
    tax: number,
    totalPrice: number
    isPaid: boolean
    isDelivered: boolean
    paidAt: string
    createdAt: string
    deliveredAt: string
}
export interface OrderDetailState {
    order: FetchedOrderType,
    error?: string,
    loading: boolean
    success: boolean

}

export interface OrderDetailAction {
    type: string
    payload?: any
}



export interface OrderListState {
    orders?: FetchedOrderType[],
    error?: string,
    loading: boolean
    success: boolean

}

export interface OrderListAction {
    type: string
    payload?: any
}




export interface OrderPaidState {
    error?: string,
    loading: boolean
    success: boolean

}


export interface OrderDeliverState {
    error?: string,
    loading: boolean
    success: boolean

}

export interface OrderPaidAction {
    type: string
    payload?: any
}


export interface UserListState {
    error: string,
    loading: boolean,
    users: user[]
}

export interface UserListAction {
    type: string,
    payload: any
}



export interface UserEditState {
    error: string,
    loading: boolean,
    success: boolean
}

export interface UserEditAction {
    type: string,
    payload: any
}



export interface UserEditDetailState {
    error: string,
    loading: boolean,
    user: user
}

export interface UserEditDetailAction {
    type: string,
    payload: any
}



export interface UserDeleteState {
    error: string,
    loading: boolean,
    success: boolean
}

export interface UserDeleteAction {
    type: string,
    payload: any
}


export interface typeAction {
    type: string,
    payload: any
}