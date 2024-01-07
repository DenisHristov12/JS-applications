import { get, post } from "./api.js";

const endPoints = {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
};

export async function login(email, password) {
    const user = await post(endPoints.login, {email, password});
    sessionStorage.setItem("user", JSON.stringify(user));
}

export async function register(email, password) {
    const user = await post(endPoints.register, {email, password});
    sessionStorage.setItem("user", JSON.stringify(user));
}

export async function logout() {
    await get(endPoints.logout);
    sessionStorage.removeItem("user");
}