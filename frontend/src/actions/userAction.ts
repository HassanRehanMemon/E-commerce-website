import axios from "axios";
import { Dispatch } from "redux";
import { UserEdit, UserEditDetail, UserList, UserSingIn, UserSingUp } from "../constants";
import { State } from "../reducers";


export const userSignInAction = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: UserSingIn.REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )
        console.log(data);

        dispatch({
            type: UserSingIn.SUCCESS,
            payload: data
        })

        localStorage.setItem('UserInfo', JSON.stringify(data))
    } catch (error: any) {
        dispatch({
            type: UserSingIn.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};


export const userSignUpAction = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: UserSingUp.REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            '/api/users/',
            { name, email, password },
            config
        )
        console.log(data);

        dispatch({
            type: UserSingUp.SUCCESS,
            payload: data
        })
        dispatch({
            type: UserSingIn.SUCCESS,
            payload: data
        })

        localStorage.setItem('UserInfo', JSON.stringify(data))
    } catch (error: any) {
        dispatch({
            type: UserSingUp.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};


export const signOutAction = () => (dispatch: Dispatch) => {
    localStorage.removeItem('UserInfo')
    dispatch({
        type: UserSingIn.LOGOUT
    })
    console.log('over hesre');
}



export const userListAction = () => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: UserList.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const { data } = await axios.get(
            '/api/users/',
            config
        )

        dispatch({
            type: UserList.SUCCESS,
            payload: data
        })

    } catch (error: any) {
        dispatch({
            type: UserList.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};



export const userEditAction = (id: string,name: string, email: string, isAdmin: boolean) => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: UserEdit.REQUEST })
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const { data } = await axios.put(
            `/api/users/${id}`,
            {name, email, isAdmin},
            config
        )

        dispatch({
            type: UserEdit.SUCCESS,
            payload: data
        })

    } catch (error: any) {
        dispatch({
            type: UserEdit.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};




export const userEditDetailAction = (id: string) => async (dispatch: Dispatch, getState: () => State) => {
    try {
        dispatch({ type: UserEditDetail.REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${getState().userSignIn.user.token}`
            }
        }
        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: UserEditDetail.SUCCESS,
            payload: data
        })

    } catch (error: any) {
        dispatch({
            type: UserEditDetail.FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
};