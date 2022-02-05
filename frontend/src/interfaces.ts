
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


// product reducer

export interface ProductListAction  {
    type: string
    payload?: any
    error?: string
};

export interface ProductListState  {
    products? : any,
    error? : string,
    loading: boolean
};