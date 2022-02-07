import { UserSingIn } from "../constants";
import { userSignInAction, userSignInState, user } from "../interfaces";


const initUserSignInState: userSignInState = {
    user: {} as user,
    error: "",
    loading: true

}
export const userSignInReducer = (state: userSignInState = initUserSignInState, action: userSignInAction) => {
    switch (action.type) {
        case (UserSingIn.REQUEST):
            return { ...state, user: {}, error: "", loading: true }

        case (UserSingIn.SUCCESS):
            return { ...state, user: action.payload, loading: false }

        case (UserSingIn.FAIL):
            return { ...state, error: action.payload, loading: false }

        default:
            return state
    }
};