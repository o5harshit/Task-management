export const HOST = import.meta.env.VITE_SERVER_URL;

//AUTH ROUTES
export const AUTH_ROUTES = `${HOST}/api/auth`
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const ADMIN_LOGIN_ROUTE = `${AUTH_ROUTES}/adminLogin`
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`

//Project-Routes
export const PROJECT_ROUTES = `${HOST}/api/project`
export const GET_ALL_PROJECTS = `${PROJECT_ROUTES}/allprojects`
export const GET_ALL_MY_PROJECTS = `${PROJECT_ROUTES}/Assigntome`


// Comments-Routes

export const COMMENT_ROUTES = `${HOST}/api/comment`;

