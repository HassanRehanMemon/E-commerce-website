
export interface product {
    _id: any
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


// product List reducer : to list all reducers

export interface ProductListAction {
    type: string
    payload?: any
    error?: string
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
    error?: string
}