import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { logout } from "./api/auth.js";
import { getUserData } from "./utils.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from './views/login.js';
import { showRegister } from "./views/register.js";
import { showTeams } from "./views/teams.js";

console.log("Here");

const navTemplate = (user) => html`
                <a href="/teams" class="action">Browse Teams</a>
                ${!user ? html`
                <a href="/login" class="action">Login</a>
                <a href="/register" class="action">Register</a>
                ` : html `
                <a href="/teams" class="action">My Teams</a>
                <a href="#" class="action" @click=${onLogout}>Logout</a>
                `}
`;

async function onLogout() {
    try {
        await logout();

        page.redirect("/");
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

function updateNav(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector("nav"));

    next();
}

function session(ctx, next) {
    const user =  getUserData();

    if(user){
        ctx.user = user;
    }

    next();
}

function decorateContext(ctx, next) {
    ctx.render = function(content){
        render(content, document.querySelector("main"));
    };

    next();
}

page(session);
page(decorateContext);
page(updateNav);


page("/", showHome);
page("/login", showLogin);
page("/register", showRegister);
page("/teams", showTeams);
page("/teams/:id", showDetails);

page.start();