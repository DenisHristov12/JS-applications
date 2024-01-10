import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";
import page from '../../node_modules/page/page.mjs';


const loginTemplate = (onLogin) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data);

        if(!data.email || !data.password){
            alert("Something wrong!");
            return;
        }

        try {
            await login(data.email, data.password);

            page.redirect("/")
        } catch (err) {
            alert(err.message);
            throw err;
        }
    }
}