import {
    AUTH_ERROR,
    LOAD_USER,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './constraint/constraint';

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedIn: false,
    errors: {}
}
console.log("eeeeeeee:" +initialState.isLoggedIn);
const authReducer = (state = initialState,action) => {
    const { type,payload } = action;
    console.log("Type: " + type);
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                isLoggedIn: true
            };
        case LOAD_USER:
            localStorage.getItem('token');
            return {
                ...state,
                isLoggedIn: true
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('fullName');
            localStorage.removeItem('admin');
            return {
                ...state,
                isLoggedIn: false,
                errors: payload
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('fullName');
            localStorage.removeItem('admin');
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;