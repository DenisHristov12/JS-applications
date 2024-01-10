import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { AuthService } from "./services/AuthService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiService.js";
import { SessionService } from "./services/SessionService.js";
import { NavComponent } from "./components/nav/nav.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";


const main = document.querySelector("#wrapper main");
const nav = document.querySelector("#wrapper header");

// router

let router = {
    navigate: page.show,
    redirect: page.redirect
};

// baseUrl

const baseUrl = "http://localhost:3030";

// render handlers

let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, nav);

// service

let sessionService = new SessionService();
let authService = new AuthService(baseUrl, sessionService);
let shoesService = new BaseCrudApiService(baseUrl, "/data/shoes", sessionService);

// components

let navComponent = new NavComponent(authService, renderNav, navTemplate, router);
let homeComponent = new HomeComponent(renderBody, homeTemplate);
let loginComponent = new LoginComponent(authService, renderBody, loginTemplate, router);

// routing

page('/index.html', '/');
page(navComponent._showView);

page('/', homeComponent._showView);
page('/login', loginComponent._showView);
page.start();



