const API_URL: string = import.meta.env.VITE_APP_API_URL;
// const DOMAIN_URL = import.meta.env.VITE_APP_URL;

export const toAbsoluteUrl = (pathname: string) =>
    import.meta.env.BASE_URL + pathname;

export const GET_REQUEST_ = `${API_URL}/list/companyName/list`;
export const GET_ALL_ROLES = `${API_URL}/roles/list`;
export const GET_ALL_DEPARTMENTS = `${API_URL}/departments/list`;
export const CREATE_ACCOUNT = `${API_URL}/users/create`;
export const ACCOUNT_LOGIN = `${API_URL}/auth/login`;
export const CURRENT_USER_DETAILS = `${API_URL}/users/getUsers`;
export const TOTAL_COUNT = `${API_URL}/users/count`;
export const TEAM_LIST = `${API_URL}/teams/list`;
export const CREATE_TEAM = `${API_URL}/teams/create`;
export const EDIT_TEAM = `${API_URL}/teams`;
export const DELETE_TEAM = `${API_URL}/teams`;

