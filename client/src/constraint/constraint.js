export const LOAD_USER = "LOAD USER";
export const AUTH_ERROR = "AUTHENTICATION ERROR";
export const LOG_OUT = "LOG OUT";
export const AUTH_USER = 'AUTH_USER';
export const REGISTER_SUCCESS = "REGISTER SUCCESS";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_FAIL = "LOGIN FAIL";
export const REGISTER_FAIL = "REGISTER FAIL";
export const SERVER_PATH = getServerPath();
export const CLIENT_PATH = getClientPath();

function getClientPath() {

    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:1234';
    }

}

function getServerPath() {
    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:4002';
    }
}