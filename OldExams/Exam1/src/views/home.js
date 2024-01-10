import page from "../../node_modules/page/page.mjs";
import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`
<section id="home">
          <h1>Welcome to our website, where curiosity meets enjoyment!
             Discover fascinating fun facts that engage and entertain everyone,
              inviting you to participate in the joy of learning something new together.</h1>
              <img id="logo-img" src="./images/logo.png" alt=""/>
        </section>
`;

export function showHome(ctx, next) {
    ctx.render(homeTemplate());

    next();
}