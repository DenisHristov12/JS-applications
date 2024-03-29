import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";

const loginTemplate = (onSubmit) => html `
<section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
                        <!-- <div class="error">Error message.</div> -->
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        console.log(data.email);

        try {
            await login(data.email, data. password);

            ctx.page.redirect("/");
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

}