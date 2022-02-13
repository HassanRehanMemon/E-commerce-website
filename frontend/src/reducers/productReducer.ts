import { ProductDetail, ProductList } from '../constants';
import { product, productDetailAction, ProductDetailState, ProductListAction, ProductListState } from '../interfaces';



const initProductListState: ProductListState = {
    products: [] as product[],
    error: "",
    loading: true

}


export const productListReducer = (state: ProductListState = initProductListState, action: ProductListAction) => {
    switch (action.type) {
        case (ProductList.REQUEST):
            return { ...state, loading: true }

        case (ProductList.SUCCESS):
            return { ...state, products: action.payload as product[], loading: false }

        case (ProductList.FAIL):
            return { ...state, error: action.payload, loading: false }

        default:
            return state
    }
};

const initProductDetail: ProductDetailState = {
    product: {} as product,
    error: "",
    loading: true
}

export const listProductDetails = (state: ProductDetailState = initProductDetail, action: productDetailAction) => {
    switch (action.type) {
        case (ProductDetail.REQUEST):
            return { ...state, loading: true }

        case (ProductDetail.SUCCESS):
            return { ...state, product: action.payload, loading: false }

        case (ProductDetail.FAIL):
            return { ...state, error: action.payload, loading: false }

        default:
            return state
    }

}

