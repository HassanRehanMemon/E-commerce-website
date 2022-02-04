import React from 'react';
import { ProductList } from '../constants';

type ProductListState = {
    products? : any,
    error? : string,
    loading: boolean
};

const initProductListState: ProductListState = {
    products : [],
    error : "",
    loading:true
    
}

type ProductListAction = {
    type: string
    payload?: any
    error?: string
};

export const productListReducer = (state: ProductListState= initProductListState, action: ProductListAction) => {
    switch (action.type) {
        case (ProductList.REQUEST):
            return { ...state, products: [], error: "" }

        case (ProductList.SUCCESS):
            return { ...state, products: action.payload }

        case (ProductList.FAIL):
            return { ...state, payload: action.payload }

        default:
            return state
    }
};

