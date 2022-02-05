import React from 'react';
import { ProductList } from '../constants';
import { ProductListAction, ProductListState } from '../interfaces';



const initProductListState: ProductListState = {
    products : [],
    error : "",
    loading:true
    
}


export const productListReducer = (state: ProductListState= initProductListState, action: ProductListAction) => {
    switch (action.type) {
        case (ProductList.REQUEST):
            return { ...state, products: [], error: "" }

        case (ProductList.SUCCESS):
            return { ...state, products: action.payload }

        case (ProductList.FAIL):
            return { ...state, error: action.payload }

        default:
            return state
    }
};

