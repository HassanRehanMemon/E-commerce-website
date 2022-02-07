import { UserSingIn } from "../constants";
import { userSignInAction, userSignInState, user } from "../interfaces";
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