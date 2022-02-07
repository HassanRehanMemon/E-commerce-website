import { UserSingIn, UserSingUp } from "../constants";
import { userSignInAction, userSignInState, user, userSignUpState, userSignUpAction } from "../interfaces";
// import reducers from './index'


const initUserSignInState: userSignInState = {
    user: {} as user,
    error: "",
    loading: false

}
export const userSignInReducer = (state: userSignInState = initUserSignInState, action: userSignInAction) => {
    switch (action.type) {
        case (UserSingIn.REQUEST):
            return { ...state, loading: true }

        case (UserSingIn.SUCCESS):
            return { ...state, user: action.payload, loading: false }

        case (UserSingIn.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (UserSingIn.LOGOUT):
            // return reducers(undefined, action)
            return { ...state, user: null, error: "", loading: false }


        default:
            return state
    }
};



const initUserSignUpState: userSignUpState = {
    user: {} as user,
    error: "",
    loading: false

}
export const userSignUpReducer = (state: userSignUpState = initUserSignInState, action: userSignUpAction) => {
    switch (action.type) {
        case (UserSingUp.REQUEST):
            return { ...state, loading: true }

        case (UserSingUp.SUCCESS):
            return { ...state, user: action.payload, loading: false }

        case (UserSingUp.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (UserSingIn.LOGOUT):
            // return reducers(undefined, action)
            return { ...state, user: null, error: "", loading: false }

        default:
            return state
    }
};