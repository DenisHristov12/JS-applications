import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/auth.js";
import page from '../../node_modules/page/page.mjs';

const registerTemplate = (onRegister) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data);

        if(!data.email || !data.password || (data.password !== data["re-password"])){
            alert("Something wrong!");
            return;
        }

        try {
            await register(data.email, data.password);

            page.redirect("/")
        } catch (err) {
            alert(err.message);
            throw err;
        }
    }
}