import page from '../../node_modules/page/page.mjs';
import { html } from '../../node_modules/lit-html/lit-html.js';

const homeTemplate = () => html`
  <section id="hero">
    <h1>Accelerate Your Passion Unleash the Thrill of Sport Cars Together!</h1>
  </section>
`;

export function showHome(ctx, next) {
  ctx.render(homeTemplate());

  next();
}
