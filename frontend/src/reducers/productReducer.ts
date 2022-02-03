import React from 'react';
import { ProductList } from '../constants';

type ProductListState = {
    products? : any,
    error? : string
};

const initProductListState: ProductListState = {
    products : {},
    error : ""
    
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
            return { ...state, error: action.error }

        default:
            return state
    }
};

