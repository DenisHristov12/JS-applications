import { render, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

import { register } from "../api/users.js";
import * as utilsJs from "../utils.js";

const registerTemplate = () => html` 
<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @onSubmit="${onSubmit}">
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`;

export async function registerView() {
  console.log("...register...");

  render(registerTemplate(), document.querySelector("body div.container"));
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePass = formData.get("rePass");

    await register(email, password, rePass);

    utilsJs.updateNav();

    page.redirect("/");
}