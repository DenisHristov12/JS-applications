import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getUserData } from "./utils.js";
import { showHome } from "./views/home.js";
import { logout } from "./api/auth.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showDashboard } from "./views/dashboard.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showCreate } from "./views/create.js";

console.log("here");

const navTemplate = (user) => html`
        <div>
            <a href="/dashboard">Fun Facts</a>
          </div>

          ${user ? html`
          <div class="user">
            <a href="/create">Add Fact</a>
            <a href="#" @click=${onLogout}>Logout</a>
          </div>`
          : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            
          </div>`}
`

async function onLogout() {
    try{
        await logout();

        page.redirect("/");
    }catch(err){
        alert(err.message)
        throw err;
    }
}


function updateNav(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector("nav"))

    next();
}

function session(ctx, next){
    const user = getUserData();

    if(user){
        ctx.user = user;
    }

    next();
}

function decorateContext(ctx, next) {
    ctx.render = function (content){
        render(content, document.querySelector("main"));
    };

    next();
}


page(session)
page(decorateContext);
page(updateNav);
page(showHome);

page("/", showHome);
page("/dashboard", showDashboard);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);
page("/create", showCreate);


page("/login", showLogin);
page("/register", showRegister);


page.start();