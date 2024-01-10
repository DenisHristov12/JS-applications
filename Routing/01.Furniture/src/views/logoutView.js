import { logout } from "../api/users.js";
import { updateNav } from "../utils.js";

export async function logoutView() {
    logout();
    updateNav();
}