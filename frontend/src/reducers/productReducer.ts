import { AddReview, ProductCreate, ProductDelete, ProductDetail, ProductEdit, ProductList } from '../constants';
import { AddReviewState, product, ProductCreateState, ProductDeleteState, productDetailAction, ProductDetailState, ProductEditAction, ProductEditState, ProductListAction, ProductListState, typeAction } from '../interfaces';



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

        case (ProductDetail.RESET):
            return initProductDetail

        default:
            return state
    }

}

const initProductDelete: ProductDeleteState = {
    error: "",
    loading: false,
    success: false
}

export const deleteProductReducer = (state: ProductDeleteState = initProductDelete, action: productDetailAction) => {
    switch (action.type) {
        case (ProductDelete.REQUEST):
            return { ...state, loading: true }

        case (ProductDelete.SUCCESS):
            return { ...state, success: true, loading: false }

        case (ProductDelete.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (ProductDelete.RESET):
            return initProductDelete

        default:
            return state
    }

}

const initProductCreate: ProductCreateState = {
    error: "",
    loading: false,
    success: false,
    product: {} as product
}

export const createProductReducer = (state: ProductCreateState = initProductCreate, action: productDetailAction) => {
    switch (action.type) {
        case (ProductCreate.REQUEST):
            return { ...state, loading: true }

        case (ProductCreate.SUCCESS):
            return { ...state, success: true, loading: false, product: action.payload }

        case (ProductCreate.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (ProductCreate.RESET):
            return initProductCreate

        default:
            return state
    }

}



const initProductEditState: ProductEditState = {
    success: false,
    error: "",
    loading: false
}


export const ProductEditReducer = (state: ProductEditState = initProductEditState, action: ProductEditAction) => {
    switch (action.type) {
        case (ProductEdit.REQUEST):
            return { ...state, loading: true, error: "", success: false }

        case (ProductEdit.SUCCESS):
            return { ...state, success: true, loading: false }

        case (ProductEdit.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (ProductEdit.RESET):
            return initProductListState


        default:
            return state
    }
};


const initAddReviewState: AddReviewState = {
    success: false,
    error: "",
    loading: false
}


export const AddReviewReducer = (state: AddReviewState = initAddReviewState, action: typeAction) => {
    switch (action.type) {
        case (AddReview.REQUEST):
            return { ...state, loading: true, error: "", success: false }

        case (AddReview.SUCCESS):
            return { ...state, success: true, loading: false }

        case (AddReview.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (AddReview.RESET):
            return initAddReviewState


        default:
            return state
    }
};