import { clearUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";


const endpoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
};

export async function login (email, password) {
    const response = await post(endpoints.login, {email, password});

    setUserData(response);

    return response;
}

export async function register (email, password) {
    const response = await post(endpoints.register, {email, password});

    setUserData(response);

    return response;
}

export async function logout () {
    await get(endpoints.logout);

    clearUserData();
}