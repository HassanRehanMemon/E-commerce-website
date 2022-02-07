import axios from "axios";
import { Dispatch } from "redux";
import { UserSingIn } from "../constants";


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
    } catch (e: any) {
        dispatch({
            type: UserSingIn.FAIL,
            payload: e.message
        })
    }
};


export const signOutAction = () => (dispatch: Dispatch) =>{
    localStorage.removeItem('UserInfo')
    dispatch({
        type: UserSingIn.LOGOUT
    })
    console.log('over hesre');
}