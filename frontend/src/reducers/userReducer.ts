import { UserDelete, UserEdit, UserEditDetail, UserList, UserSingIn, UserSingUp } from "../constants";
import { userSignInAction, userSignInState, user, userSignUpState, userSignUpAction, UserListState, UserListAction, UserEditState, UserEditAction, UserEditDetailState, UserEditDetailAction, UserDeleteState, UserDeleteAction } from "../interfaces";
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
export const userSignUpReducer = (state: userSignUpState = initUserSignUpState, action: userSignUpAction) => {
    switch (action.type) {
        case (UserSingUp.REQUEST):
            return { ...state, loading: true }

        case (UserSingUp.SUCCESS):
            return { ...state, user: action.payload, loading: false }

        case (UserSingUp.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (UserSingIn.LOGOUT):
            return { ...state, user: null, error: "", loading: false }

        default:
            return state
    }
};


const initUserListState: UserListState = {
    users: [] as user[],
    loading: false,
    error: "",

}

export const userListReducer = (state: UserListState = initUserListState, action: UserListAction) => {
    switch (action.type) {
        case (UserList.REQUEST):
            return { ...state, loading: true, error: "" }

        case (UserList.SUCCESS):
            return { ...state, users: action.payload, loading: false }

        case (UserList.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (UserList.RESET):
            return initUserListState


        default:
            return state
    }
};


const initUserEditState: UserEditState = {
    success: false,
    error: "",
    loading: false
}


export const userEditReducer = (state: UserEditState = initUserEditState, action: UserEditAction) => {
    switch (action.type) {
        case (UserEdit.REQUEST):
            return { ...state, loading: true, error: "", success: false }

        case (UserEdit.SUCCESS):
            return { ...state, success: true, loading: false }

        case (UserEdit.FAIL):
            return { ...state, error: action.payload, loading: false }

        case (UserEdit.RESET):
            return initUserListState


        default:
            return state
    }
};



const initUserEditDetailState: UserEditDetailState = {
    user: {} as user,
    error: "",
    loading: false
}

export const userDetailsReducer = (state: UserEditDetailState = initUserEditDetailState, action: UserEditDetailAction) => {
    switch (action.type) {
        case UserEditDetail.REQUEST:
            return { ...state, loading: true }
        case UserEditDetail.SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case UserEditDetail.FAIL:
            return { ...state, loading: false, error: action.payload }
        case UserEditDetail.RESET:
            return initUserEditDetailState
        default:
            return state
    }
}



const initUserDeleteState: UserDeleteState = {
    success: false,
    error: "",
    loading: false
}

export const userDeleteReducer = (state: UserDeleteState = initUserDeleteState, action: UserDeleteAction) => {
    switch (action.type) {
        case UserDelete.REQUEST:
            return {  loading: true,  }
        case UserDelete.SUCCESS:
            return {  loading: false, success: true}
        case UserDelete.FAIL:
            return {  loading: false, error: action.payload }
        default:
            return state
    }
}