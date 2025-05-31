const API_URL: string = import.meta.env.VITE_APP_API_URL;
const DOMAIN_URL = import.meta.env.VITE_APP_URL;

export const toAbsoluteUrl = (pathname: string) =>
    import.meta.env.BASE_URL + pathname;

export const GET_REQUEST_ = `${API_URL}/list/companyName/list`;
export const GET_ALL_ROLES = `${API_URL}/roles/list`;
export const GET_ALL_DEPARTMENTS = `${API_URL}/departments/list`;

