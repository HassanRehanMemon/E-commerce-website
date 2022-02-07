import axios from "axios";
import { Dispatch } from "redux";
import { UserSingIn, UserSingUp } from "../constants";


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