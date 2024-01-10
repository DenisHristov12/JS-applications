// entry point for the whole app

import page from "../node_modules/page/page.mjs";
import { catalogView } from "./views/catalogView.js";
import { detailsView } from "./views/detailsView.js";
import { loginView } from "./views/loginView.js";
import { updateNav } from "./utils.js";
import { editView } from "./views/editView.js";
import { logoutView } from "./views/logoutView.js";
import { registerView } from "./views/registerView.js";
import { createView } from "./views/createView.js";



updateNav();

page("/", catalogView);
page("/create", createView);
// page("/myFurniture", myFurnitureView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutView);
page.start();