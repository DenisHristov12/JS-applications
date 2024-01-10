import page from "../../node_modules/page/page.mjs";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";


const loginTemplate = (onSubmit) => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onSubmit}>
    <input type="text" name="email" id="email" placeholder="email" />
    <input
      type="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="#">Create an account</a>
    </p>
  </form>
</div>
</section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        try {
            if(!data.email || !data.password){
              alert("Empty fields!");
            }else{
              await login(data.email, data.password);

              page.redirect("/");
            }
        } catch (error) {
            alert(error.message);
            throw error;
        }
    }
}