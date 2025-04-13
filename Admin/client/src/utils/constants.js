export const HOST = import.meta.env.VITE_SERVER_URL;

//AUTH ROUTES
export const AUTH_ROUTES = `${HOST}/api/auth`
export const ADMIN_LOGIN_ROUTE = `${AUTH_ROUTES}/adminLogin`
export const GET_USER_INFO = `${AUTH_ROUTES}/Admin-info`
export const LOGOUT_USER  = `${AUTH_ROUTES}/logout`


// Project Create Routes
export const PROJECT_ROUTES = `${HOST}/api/project`
export const CREATE_PROJECT = `${PROJECT_ROUTES}/create`
export const GET_ALL_PROJECTS = `${PROJECT_ROUTES}/allprojects`
export const GET_ALL_USER_PROJECTS = `${PROJECT_ROUTES}/userProjects`;

// Get Users

export const GET_USERS = `${AUTH_ROUTES}/user`;


// COMMENT Routes

export const COMMENT_ROUTES = `${HOST}/api/comment`;
