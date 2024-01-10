import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/auth.js";

const registerTemplate = (onRegister) => html `
<section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" class="main-form pad-large" @submit=${onRegister}>
                        <!-- <div class="error">Error message.</div> -->
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>
`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        try {
            await register(data.email, data. password);

            ctx.page.redirect("/");
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

}