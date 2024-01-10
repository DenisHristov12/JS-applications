import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { logout } from "./api/auth.js";
import { clearUserData, getUserData } from "./utils.js";
import { showCreate } from "./views/create.js";
import { showDashboard } from "./views/dashboard.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

const navTemplate = (user) => html`
        <div>
            <a href="/dashboard">Motorcycles</a>
            <a href="#">Search</a>
          </div>

          ${user ? html`
          <div class="user">
            <a href="/create">Add Motorcycle</a>
            <a href="#" @click=${onLogout}>Logout</a>
          </div>
          ` : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            
          </div>
          `}
`;

function updateNav(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector("nav"));

    next();
}

function onLogout() {
    logout();

    clearUserData();

    page.redirect("/");
}

function decorateContext(ctx, next) {
    ctx.render = function(content){
        render(content, document.querySelector("main"));
    }

    next();
}

function session(ctx, next) {
    const user = getUserData();

    if(user){
        ctx.user = user;
    }

    next();
}

page(decorateContext)
page(session)
page(updateNav)

page("/", showHome)
page("/dashboard", showDashboard)
page("/details/:id", showDetails)
page("/edit/:id", showEdit)
page("/create", showCreate)


page("/login", showLogin)
page("/register", showRegister)

page.start();