
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



// ---------------- Cart ---------------
//// Add to cart reducer
export interface shippingAddressType{
    address : string,
    city : string,
    country : string,
    postalCode : string,
}
export interface AddToCartState {
    cartItems: addToCartProduct[]
    shippingAddress : shippingAddressType
    paymentMethod : string
    shippingFee : number
    tax : number
    totalPrice : number

}

export interface addToCartProduct  {
    name : string
    product_id : string
    image : string
    price : number
    countInStock : number
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
        shippingAddress : shippingAddressType
        paymentMethod :string,
        shippingFee: number,
        tax: number,
        totalPrice :number
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