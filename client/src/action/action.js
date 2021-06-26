import {
    AUTH_ERROR,
    AUTH_USER,
    CLIENT_PATH,
    LOAD_USER,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SERVER_PATH
} from '../constraint/constraint';
import Swat from "sweetalert2";
import axios from "axios";
import {setToken} from "../setToken";

export const loadUser1 = async () => {

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }
    return await axios.get(SERVER_PATH + '/users');
}

export const loadUser = () => async dispatch => {

    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }
    try {
        const response = await axios.get(SERVER_PATH + '/users');

        const position = response.data.user_position;
        console.log(position);
        dispatch({
            type: LOAD_USER,
            payload: response.data,
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: e
        })
    }
}
export const loginUser = (user_email, user_password) => async dispatch => {

    try {

        const config = {

            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({user_email, user_password})
        const response1 = await axios.post(SERVER_PATH + '/users/login', body, config);

        if (response1.data !== undefined) {
            loggedAlert();
        }


        dispatch({
            type: LOGIN_SUCCESS,
            payload: response1.data,
        })

        dispatch(loadUser());

    } catch (e) {
        if (e) {
            invalidLogin();
        }

        dispatch({
            type: LOGIN_FAIL,
            payload: e
        })
    }
}
const invalidLogin = () => {
    Swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check your email and password!'
    })
}
const loggedAlert = () => {
    Swat.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully logged in',
        showConfirmButton: false,
        timer: 3000
    })
}
